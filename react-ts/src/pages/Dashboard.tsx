import DashboardOverview from "../components/Dashboard";
import Sidebar from "../components/Sidebar";
import { PageLoading } from "../components/Animations/Animation";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import Success from "../components/Modals/Success";

export default function Dashboard() {
  const location = useLocation();

  const [success, setSuccess] = useState<string | null>(
    location.state?.success || null
  );

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(null);

        // Clear the navigation state so refreshing doesn't show it again
        window.history.replaceState({}, document.title);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success]);
  return (
    <PageLoading className="flex min-h-screen bg-[#0B132B] text-gray-200">
        <Sidebar />
        {success && (
        <Success
          title="Success"
          description={success}
        />
      )}
        <DashboardOverview/>
    </PageLoading>
  );
}