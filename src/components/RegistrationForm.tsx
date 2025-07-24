import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { UserPlus, MapPin, Phone, Mail, Calendar, Shield } from "lucide-react";

const karnatakaDistricts = [
  "Bengaluru Urban", "Bengaluru Rural", "Mysuru", "Tumakuru", "Mandya", "Chamarajanagar",
  "Hassan", "Dakshina Kannada", "Kodagu", "Chikkamagaluru", "Udupi", "Shivamogga",
  "Davanagere", "Chitradurga", "Ballari", "Koppal", "Raichur", "Kalaburagi",
  "Bidar", "Yadgir", "Dharwad", "Gadag", "Haveri", "Uttara Kannada", "Belagavi",
  "Bagalkot", "Vijayapura", "Chikkaballapur", "Kolar", "Ramanagara"
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    aadharNumber: "",
    district: "",
    address: "",
    agreeToTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration data:", formData);
    // Handle registration logic here
  };

  return (
    <section id="register" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <UserPlus className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold">Voter Registration</CardTitle>
              <CardDescription className="text-lg">
                Register as a verified voter for Karnataka state elections
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
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
                    <Label htmlFor="phone">
                      <Phone className="h-4 w-4 inline mr-2" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">
                      <Calendar className="h-4 w-4 inline mr-2" />
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aadharNumber">
                      <Shield className="h-4 w-4 inline mr-2" />
                      Aadhar Number
                    </Label>
                    <Input
                      id="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={(e) => setFormData({...formData, aadharNumber: e.target.value})}
                      placeholder="XXXX XXXX XXXX"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="district">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    District (Karnataka)
                  </Label>
                  <Select
                    value={formData.district}
                    onValueChange={(value) => setFormData({...formData, district: value})}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your district" />
                    </SelectTrigger>
                    <SelectContent>
                      {karnatakaDistricts.map((district) => (
                        <SelectItem key={district} value={district}>
                          {district}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Complete Address</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Enter your complete address"
                    required
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData({...formData, agreeToTerms: checked === true})}
                    required
                  />
                  <Label htmlFor="agreeToTerms" className="text-sm">
                    I agree to the terms and conditions and authorize verification of my details
                  </Label>
                </div>
                
                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full"
                  disabled={!formData.agreeToTerms}
                >
                  Submit Registration
                </Button>
                
                <p className="text-center text-sm text-muted-foreground">
                  Your registration will be reviewed by our AI verification system and approved within 24-48 hours.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;