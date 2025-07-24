import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Users, Vote, BarChart3, UserCheck, UserX, Plus, Eye } from "lucide-react";

const mockPendingVoters = [
  { id: 1, name: "Raj Kumar", email: "raj@example.com", district: "Bengaluru Urban", status: "pending", aadhar: "****-****-1234" },
  { id: 2, name: "Priya Sharma", email: "priya@example.com", district: "Mysuru", status: "pending", aadhar: "****-****-5678" },
  { id: 3, name: "Arjun Reddy", email: "arjun@example.com", district: "Mandya", status: "pending", aadhar: "****-****-9012" }
];

const mockElections = [
  { id: 1, title: "Assembly Election 2024", status: "active", totalVotes: 15420, startDate: "2024-07-01", endDate: "2024-08-15" },
  { id: 2, title: "Municipal Election", status: "draft", totalVotes: 0, startDate: "2024-09-01", endDate: "2024-09-20" }
];

const AdminDashboard = () => {
  const [pendingVoters, setPendingVoters] = useState(mockPendingVoters);
  const [newElection, setNewElection] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: ""
  });

  const handleApproveVoter = (voterId: number) => {
    setPendingVoters(prev => prev.filter(voter => voter.id !== voterId));
    console.log("Approved voter:", voterId);
  };

  const handleRejectVoter = (voterId: number) => {
    setPendingVoters(prev => prev.filter(voter => voter.id !== voterId));
    console.log("Rejected voter:", voterId);
  };

  const handleCreateElection = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating election:", newElection);
    setNewElection({ title: "", description: "", startDate: "", endDate: "" });
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Admin Dashboard</h2>
            <p className="text-lg text-muted-foreground">Manage elections and voter approvals</p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">1,247</div>
                <p className="text-sm text-muted-foreground">Registered Voters</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Vote className="h-8 w-8 text-success mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">15,420</div>
                <p className="text-sm text-muted-foreground">Total Votes Cast</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 text-accent mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">2</div>
                <p className="text-sm text-muted-foreground">Active Elections</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <UserCheck className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{pendingVoters.length}</div>
                <p className="text-sm text-muted-foreground">Pending Approvals</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Admin Tabs */}
          <Tabs defaultValue="approvals" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="approvals">Voter Approvals</TabsTrigger>
              <TabsTrigger value="elections">Elections</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            {/* Voter Approvals Tab */}
            <TabsContent value="approvals">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Voter Approvals</CardTitle>
                  <CardDescription>
                    Review and approve voter registrations with AI verification assistance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingVoters.map((voter) => (
                      <Card key={voter.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h4 className="font-semibold">{voter.name}</h4>
                            <p className="text-sm text-muted-foreground">{voter.email}</p>
                            <div className="flex gap-2">
                              <Badge variant="outline">{voter.district}</Badge>
                              <Badge variant="secondary">Aadhar: {voter.aadhar}</Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => console.log("View details:", voter.id)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleRejectVoter(voter.id)}
                            >
                              <UserX className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button 
                              variant="default" 
                              size="sm"
                              onClick={() => handleApproveVoter(voter.id)}
                            >
                              <UserCheck className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                    {pendingVoters.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        No pending voter approvals
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Elections Tab */}
            <TabsContent value="elections">
              <div className="space-y-6">
                {/* Create New Election */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Create New Election
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateElection} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Election Title</Label>
                          <Input
                            id="title"
                            value={newElection.title}
                            onChange={(e) => setNewElection({...newElection, title: e.target.value})}
                            placeholder="e.g., Municipal Election 2024"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Input
                            id="description"
                            value={newElection.description}
                            onChange={(e) => setNewElection({...newElection, description: e.target.value})}
                            placeholder="Election description"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={newElection.startDate}
                            onChange={(e) => setNewElection({...newElection, startDate: e.target.value})}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">End Date</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={newElection.endDate}
                            onChange={(e) => setNewElection({...newElection, endDate: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      <Button type="submit" variant="hero" size="lg">
                        Create Election
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Existing Elections */}
                <Card>
                  <CardHeader>
                    <CardTitle>Manage Elections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockElections.map((election) => (
                        <Card key={election.id} className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold">{election.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {election.startDate} to {election.endDate}
                              </p>
                              <div className="flex gap-2 mt-2">
                                <Badge variant={election.status === "active" ? "default" : "secondary"}>
                                  {election.status}
                                </Badge>
                                <Badge variant="outline">{election.totalVotes} votes</Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results">
              <Card>
                <CardHeader>
                  <CardTitle>Election Results</CardTitle>
                  <CardDescription>View real-time voting results and analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    Results dashboard will be available here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
