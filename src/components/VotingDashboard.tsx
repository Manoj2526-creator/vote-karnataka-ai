import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vote, Clock, CheckCircle, User, AlertCircle } from "lucide-react";

const mockElections = [
  {
    id: 1,
    title: "Karnataka Legislative Assembly Election 2024",
    description: "General election for the Karnataka state legislature",
    status: "active",
    endDate: "2024-08-15",
    candidates: [
      { id: 1, name: "Candidate A", party: "Party 1", image: "/placeholder.svg" },
      { id: 2, name: "Candidate B", party: "Party 2", image: "/placeholder.svg" },
      { id: 3, name: "Candidate C", party: "Party 3", image: "/placeholder.svg" }
    ]
  },
  {
    id: 2,
    title: "Local Municipal Election",
    description: "Municipal corporation election for your district",
    status: "upcoming",
    endDate: "2024-09-20",
    candidates: []
  }
];

const VotingDashboard = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (selectedCandidate) {
      setHasVoted(true);
      console.log("Vote cast for candidate:", selectedCandidate);
    }
  };

  const activeElection = mockElections.find(e => e.status === "active");

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">Voting Dashboard</h2>
            <p className="text-lg text-muted-foreground">Cast your vote securely and transparently</p>
          </div>

          {/* Voter Status */}
          <Card className="mb-8 border-success border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-success" />
                Verified Voter
              </CardTitle>
              <CardDescription>
                You are approved and eligible to vote in Karnataka state elections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>John Doe</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Bengaluru Urban</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Voter ID: KA123456</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Active Elections */}
          {activeElection && !hasVoted && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Vote className="h-5 w-5 text-primary" />
                  {activeElection.title}
                </CardTitle>
                <CardDescription>{activeElection.description}</CardDescription>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Voting ends: {activeElection.endDate}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h3 className="font-semibold">Select your candidate:</h3>
                  <div className="grid gap-4">
                    {activeElection.candidates.map((candidate) => (
                      <Card 
                        key={candidate.id}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedCandidate === candidate.id 
                            ? 'ring-2 ring-primary bg-primary/5' 
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setSelectedCandidate(candidate.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                              <User className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{candidate.name}</h4>
                              <p className="text-sm text-muted-foreground">{candidate.party}</p>
                            </div>
                            {selectedCandidate === candidate.id && (
                              <CheckCircle className="h-5 w-5 text-primary ml-auto" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Button 
                    variant="vote" 
                    size="lg" 
                    className="w-full mt-6"
                    onClick={handleVote}
                    disabled={!selectedCandidate}
                  >
                    Cast Your Vote
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Vote Confirmation */}
          {hasVoted && (
            <Card className="mb-8 border-success border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  Vote Successfully Cast!
                </CardTitle>
                <CardDescription>
                  Your vote has been recorded securely and anonymously
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>Transaction ID: <code className="text-xs bg-muted px-2 py-1 rounded">VT{Date.now()}</code></p>
                  <p className="text-muted-foreground">Thank you for participating in the democratic process!</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Upcoming Elections */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Elections</CardTitle>
              <CardDescription>Elections you'll be eligible to vote in</CardDescription>
            </CardHeader>
            <CardContent>
              {mockElections.filter(e => e.status === "upcoming").map((election) => (
                <div key={election.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-semibold">{election.title}</h4>
                    <p className="text-sm text-muted-foreground">{election.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{election.endDate}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default VotingDashboard;