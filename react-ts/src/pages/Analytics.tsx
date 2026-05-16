import WeeklyComparison from "../components/WeeklyComparison";
import CategorySummary from "../components/CategorySummary";
import MonthlyTrends from "../components/MonthlyTrends";
import Sidebar from "../components/Sidebar";
import { PageLoading, Reveal } from "../components/Animations/Animation";

export default function Analytics() {
  return (
    <PageLoading className="flex min-h-screen bg-[#0B132B] text-gray-200">
    <Sidebar/>
    <div className="flex-1 p-4 md:p-8 md:ml-64 space-y-6 w-full overflow-x-hidden text-gray-200">
      <h1 className="text-2xl font-bold mt-4 md:mt-0">Analytics</h1>

      <Reveal>
      <MonthlyTrends />
      </Reveal>

      <Reveal delay={0.3}>
      <WeeklyComparison />
      </Reveal>

      <Reveal delay={0.6}>
      <CategorySummary />
      </Reveal>

    </div>
    </PageLoading>
  );
}