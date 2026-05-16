import { useEffect, useState } from "react";
import { GetInsights } from "../api/controllerApi";
import Error from "./Modals/Error";
import Summary from "./Summary";
import { Reveal, RevealGroup, RevealItem } from "./Animations/Animation";

export default function DashboardOverview() {
  const [insight, setInsight] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = async () => {
    try {
      const data = await GetInsights();
      setInsight(data);
    } catch (error: any) {
      setError(error.message || "Failed to load insights");
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  if (!insight) {
    return <p className="text-gray-200 p-8">Loading insights...</p>;
  }

  return (
    <main className="flex-1 py-4 px-2 md:p-8 md:ml-64 text-gray-200 w-full overflow-x-hidden">
      <h2 className="text-2xl font-semibold mb-6 mt-4 md:mt-0">
        Dashboard Overview
      </h2>

      {/* summary cards */}
      <RevealGroup className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {error && <Error title="Error" description={error} />}
        
        <RevealItem>
          <div className="bg-[#1C2541] p-4 rounded-lg  ">
            <h3 className="text-sm md:text-base">Income</h3>
            <p className="text-lg md:text-xl font-semibold">₦{insight.summary.totalIncome}</p>
          </div>
        </RevealItem>

        <RevealItem>
          <div className="bg-[#1C2541] p-4 rounded-lg">
            <h3 className="text-sm md:text-base">Expense</h3>
            <p className="text-lg md:text-xl font-semibold">₦{insight.summary.totalExpense}</p>
          </div>
        </RevealItem>

        <RevealItem>
          <div className="bg-[#1C2541] p-4 rounded-lg">
            <h3 className="text-sm md:text-base">Assets</h3>
            <p className="text-lg md:text-xl font-semibold">₦{insight.summary.totalAssets}</p>
          </div>
        </RevealItem>

        <RevealItem>
          <div className="bg-[#1C2541] p-4 rounded-lg">
            <h3 className="text-sm md:text-base">Balance</h3>
            <p className="text-lg md:text-xl font-semibold">₦{insight.summary.balance}</p>
          </div>
        </RevealItem>
      </RevealGroup>

      {/* ratios */}
      <Reveal delay={0.3}>
      <div className="bg-[#1C2541] p-4 md:p-6 rounded-lg mb-8">
        <h3 className="text-xl mb-4">Ratios</h3>
        <p className="text-lg md:text-xl font-semibold">Spent: {insight.ratios.spent}</p>
        <p className="text-lg md:text-xl font-semibold">Invested: {insight.ratios.invested}</p>
        <p className="text-lg md:text-xl font-semibold">Saved: {insight.ratios.saved}</p>
      </div>
      </Reveal>

      {/* insights */}
      <Reveal delay={0.6}>
      <div className="bg-[#1C2541] p-4 md:p-6 rounded-lg">
        <h3 className="text-xl mb-4">Insights</h3>

        <ul className="space-y-2 text-sm md:text-base">
        {insight.insights.map((item: { message: string; type: string }, index: number) => (
          <li
            key={index}
            className={
              item.type === "danger"
                ? "text-danger"
                : item.type === "warning"
                ? "text-warning"
                : item.type === "success"
                ? "text-success"
                : "text-blue-400"
            }
          >
            {item.message}
          </li>
        ))}
      </ul>
      </div>
      </Reveal>

        <Reveal delay={0.6}>
        <Summary/>
        </Reveal>
    </main>
  );
}