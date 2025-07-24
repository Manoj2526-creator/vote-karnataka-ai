import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Shield, Lock, Users, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-voting.jpg";

const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Karnataka Voting Platform" 
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Secure Digital Voting for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Karnataka State
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the future of democracy with our AI-powered, secure online voting platform. 
            Designed exclusively for Karnataka residents with advanced verification and fraud detection.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="xl" className="text-lg">
              Register to Vote
            </Button>
            <Button variant="outline" size="xl" className="text-lg">
              Learn More
            </Button>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-4 gap-6 mt-16">
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Secure & Verified</h3>
              <p className="text-sm text-muted-foreground">AI-powered verification prevents fraud and duplicate voting</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
              <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">End-to-End Encryption</h3>
              <p className="text-sm text-muted-foreground">Your vote is encrypted and completely anonymous</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
              <Users className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Karnataka Residents</h3>
              <p className="text-sm text-muted-foreground">Exclusively for verified Karnataka state residents</p>
            </Card>
            
            <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Real-time Results</h3>
              <p className="text-sm text-muted-foreground">Transparent, real-time election results and analytics</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;