import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RegistrationForm from "@/components/RegistrationForm";
import VotingDashboard from "@/components/VotingDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import { useAuth } from "@/hooks/useAuth";
import { useVotingData } from "@/hooks/useVotingData";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { userRole, fetchUserRole, fetchUserProfile } = useVotingData();
  const [showRegistration, setShowRegistration] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserRole(user.id);
      fetchUserProfile(user.id);
    }
  }, [user, fetchUserRole, fetchUserProfile]);

  // Show loading spinner while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show public landing page
  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Hero />
        
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-8">Get Started</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <Button
                onClick={() => window.location.href = '/auth'}
                variant="hero"
                size="lg"
                className="w-full sm:w-auto"
              >
                <LogIn className="h-5 w-5 mr-2" />
                Sign In
              </Button>
              <Button
                onClick={() => setShowRegistration(!showRegistration)}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Register to Vote
              </Button>
            </div>
          </div>
        </section>

        {showRegistration && <RegistrationForm />}
      </div>
    );
  }

  // If authenticated, show appropriate dashboard
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {userRole === 'admin' ? (
        <AdminDashboard />
      ) : (
        <VotingDashboard />
      )}
    </div>
  );
};

export default Index;
