import { useConvexAuth } from "convex/react";
import { LandingPage } from "./components/LandingPage";
import { ApplicationForm } from "./components/ApplicationForm";
import { ApplicationStatus } from "./components/ApplicationStatus";
import { AuthModal } from "./components/AuthModal";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { useState } from "react";

export default function App() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [showApply, setShowApply] = useState(false);
  const userApplication = useQuery(api.applications.getUserApplication);

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      setShowAuth(true);
    } else if (userApplication) {
      setShowApply(true);
    } else {
      setShowApply(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuth(false);
    setShowApply(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#FF6600] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {showAuth && (
        <AuthModal onClose={() => setShowAuth(false)} onSuccess={handleAuthSuccess} />
      )}

      {showApply && isAuthenticated && (
        userApplication ? (
          <ApplicationStatus application={userApplication} onClose={() => setShowApply(false)} />
        ) : (
          <ApplicationForm onClose={() => setShowApply(false)} />
        )
      )}

      <LandingPage
        onApplyClick={handleApplyClick}
        isAuthenticated={isAuthenticated}
        hasApplication={!!userApplication}
      />
    </div>
  );
}
