import { Button } from "@/components/ui/button";
import { Vote, Shield, Users } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-background/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Vote className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Karnataka e-Vote</h1>
              <p className="text-xs text-muted-foreground">Secure Digital Voting Platform</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">How it Works</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Users className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button variant="hero" size="sm">
              Register
            </Button>
            <Button variant="admin" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Admin
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;