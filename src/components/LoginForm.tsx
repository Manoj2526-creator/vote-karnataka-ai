import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Mail, Lock, Shield } from "lucide-react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    isAdmin: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login data:", formData);
    // Handle login logic here
  };

  return (
    <section id="login" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <LogIn className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">
                {formData.isAdmin ? "Admin Login" : "Voter Login"}
              </CardTitle>
              <CardDescription className="text-lg">
                Access your secure voting dashboard
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">
                    <Lock className="h-4 w-4 inline mr-2" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    type="submit" 
                    variant={formData.isAdmin ? "admin" : "hero"}
                    size="lg" 
                    className="flex-1"
                  >
                    {formData.isAdmin ? "Admin Login" : "Voter Login"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormData({...formData, isAdmin: !formData.isAdmin})}
                  >
                    <Shield className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-center space-y-2">
                  <a href="#forgot-password" className="text-sm text-primary hover:underline">
                    Forgot your password?
                  </a>
                  <p className="text-sm text-muted-foreground">
                    Don't have an account? 
                    <a href="#register" className="text-primary hover:underline ml-1">
                      Register here
                    </a>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;