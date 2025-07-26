import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Election {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  status: 'upcoming' | 'active' | 'completed';
}

export interface Candidate {
  id: string;
  election_id: string;
  name: string;
  party: string;
  description: string;
  image_url?: string;
  vote_count: number;
}

export interface VoterRegistration {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  aadhar_number: string;
  district: string;
  address: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export const useVotingData = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [voterRegistrations, setVoterRegistrations] = useState<VoterRegistration[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>('voter');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Fetch elections
  const fetchElections = async () => {
    const { data, error } = await supabase
      .from('elections')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching elections:', error);
    } else {
      setElections((data || []) as Election[]);
    }
  };

  // Fetch candidates for a specific election
  const fetchCandidates = async (electionId: string) => {
    const { data, error } = await supabase
      .from('candidates')
      .select('*')
      .eq('election_id', electionId)
      .order('name');

    if (error) {
      console.error('Error fetching candidates:', error);
    } else {
      setCandidates(data || []);
    }
  };

  // Fetch voter registrations (admin only)
  const fetchVoterRegistrations = async () => {
    const { data, error } = await supabase
      .from('voter_registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching voter registrations:', error);
    } else {
      setVoterRegistrations((data || []) as VoterRegistration[]);
    }
  };

  // Fetch user profile
  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user profile:', error);
    } else {
      setUserProfile(data);
    }
  };

  // Fetch user role
  const fetchUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user role:', error);
    } else {
      setUserRole(data?.role || 'voter');
    }
  };

  // Submit voter registration
  const submitVoterRegistration = async (registrationData: Omit<VoterRegistration, 'id' | 'status' | 'created_at'>) => {
    const { error } = await supabase
      .from('voter_registrations')
      .insert([registrationData]);

    if (error) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    } else {
      toast({
        title: "Registration submitted",
        description: "Your registration is pending admin approval",
      });
      return { error: null };
    }
  };

  // Cast vote
  const castVote = async (electionId: string, candidateId: string, voterId: string) => {
    const { error } = await supabase
      .from('votes')
      .insert([{
        voter_id: voterId,
        election_id: electionId,
        candidate_id: candidateId
      }]);

    if (error) {
      toast({
        title: "Vote failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    } else {
      toast({
        title: "Vote cast successfully",
        description: "Your vote has been recorded",
      });
      // Refresh candidates to get updated vote counts
      await fetchCandidates(electionId);
      return { error: null };
    }
  };

  // Check if user has voted in an election
  const checkUserVote = async (electionId: string, voterId: string) => {
    const { data, error } = await supabase
      .from('votes')
      .select('*')
      .eq('voter_id', voterId)
      .eq('election_id', electionId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error checking user vote:', error);
    }
    
    return data ? true : false;
  };

  // Approve voter registration (admin only)
  const approveVoterRegistration = async (registrationId: string, adminId: string) => {
    const { error } = await supabase
      .from('voter_registrations')
      .update({
        status: 'approved',
        reviewed_by: adminId,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', registrationId);

    if (error) {
      toast({
        title: "Approval failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Registration approved",
        description: "Voter registration has been approved",
      });
      await fetchVoterRegistrations();
    }

    return { error };
  };

  // Reject voter registration (admin only)
  const rejectVoterRegistration = async (registrationId: string, adminId: string, reason: string) => {
    const { error } = await supabase
      .from('voter_registrations')
      .update({
        status: 'rejected',
        reviewed_by: adminId,
        reviewed_at: new Date().toISOString(),
        rejection_reason: reason
      })
      .eq('id', registrationId);

    if (error) {
      toast({
        title: "Rejection failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Registration rejected",
        description: "Voter registration has been rejected",
      });
      await fetchVoterRegistrations();
    }

    return { error };
  };

  useEffect(() => {
    fetchElections();
    setLoading(false);
  }, []);

  return {
    elections,
    candidates,
    voterRegistrations,
    userProfile,
    userRole,
    loading,
    fetchElections,
    fetchCandidates,
    fetchVoterRegistrations,
    fetchUserProfile,
    fetchUserRole,
    submitVoterRegistration,
    castVote,
    checkUserVote,
    approveVoterRegistration,
    rejectVoterRegistration,
  };
};