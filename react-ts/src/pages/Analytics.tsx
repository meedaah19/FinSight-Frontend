import WeeklyComparison from "../components/WeeklyComparison";
import CategorySummary from "../components/CategorySummary";
import MonthlyTrends from "../components/MonthlyTrends";
import Sidebar from "../components/Sidebar";
import { PageLoading, Reveal } from "../components/Animations/Animation";

export default function Analytics() {
  return (
    <PageLoading className="flex min-h-screen bg-[#0B132B] text-gray-200">
    <Sidebar/>
    <div className="flex-1 p-8 ml-64 space-y-6 text-gray-200">
      <h1 className="text-2xl font-bold">Analytics</h1>

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