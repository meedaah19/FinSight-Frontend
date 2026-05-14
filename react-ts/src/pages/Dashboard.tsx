import DashboardOverview from "../components/Dashboard";
import Sidebar from "../components/Sidebar";
import { PageLoading } from "../components/Animations/Animation";

export default function Dashboard() {
  return (
    <PageLoading className="flex min-h-screen bg-[#0B132B] text-gray-200">
        <Sidebar />
        <DashboardOverview/>
    </PageLoading>
  );
}