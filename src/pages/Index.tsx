import Header from "@/components/Header";
import Hero from "@/components/Hero";
import RegistrationForm from "@/components/RegistrationForm";
import LoginForm from "@/components/LoginForm";
import VotingDashboard from "@/components/VotingDashboard";
import AdminDashboard from "@/components/AdminDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <RegistrationForm />
      <LoginForm />
      <VotingDashboard />
      <AdminDashboard />
    </div>
  );
};

export default Index;
