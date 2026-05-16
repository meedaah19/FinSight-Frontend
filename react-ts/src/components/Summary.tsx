import { useEffect, useState } from "react";
import { GetSummary } from "../api/controllerApi";
import Error from "./Modals/Error";

export default function Summary() {
  const [summary, setSummary] = useState<any>(null);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async () => {
    try {
      const data = await GetSummary(startDate, endDate);
      setSummary(data);
    } catch (error: any) {
        setError(error.message || "Failed to load summary");}
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (!summary) return <p>Loading summary...</p>;

  return (
    <div className="bg-[#1C2541] p-6 rounded-lg text-gray-200 mt-8">
     {error && <Error title="Error" description={error} />}
        
      <h2 className="text-xl mb-4">Summary</h2>

      <div className="flex md:flex-row flex-col gap-3 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-[#0B132B] p-2 rounded"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-[#0B132B] p-2 rounded"
        />

        <button
          onClick={fetchSummary}
          className="bg-blue-500 px-4 py-2 rounded"
        >
          Filter
        </button>
      </div>

      <div className= "flex flex-col gap-2">
      <p>Income: ₦{summary.totalIncome}</p>
      <p>Expense: ₦{summary.totalExpense}</p>
      <p>Assets: ₦{summary.totalAssets}</p>
      <p>Balance: ₦{summary.balance}</p>
      <p>Budget: ₦{summary.budget}</p>
      </div>

      <div
        className={`p-4 rounded-lg mt-4 ${
          summary.status === "danger"
            ? "bg-red-500/20 text-danger"
            : summary.status === "warning"
            ? "bg-yellow-500/20 text-warning"
            : "bg-green-500/20 text-success"
        }`}
      >
        {summary.message}
      </div>

      <ul className="space-y-2 list-none">
      {summary.insights.map(
        (item: { message: string; status: string }, index: number) => (
          <li
            key={index}
            className={
              item.status === "danger"
                ? "text-danger"
                : item.status === "warning"
                ? "text-warning"
                : "text-success"
            }
          >
            {item.message}
          </li>
        )
      )}
    </ul>
    </div>
  );
}