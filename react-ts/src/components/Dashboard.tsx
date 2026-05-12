export default function DashboardOverview() {

  return (
    <div >
      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-6">
          Dashboard Overview
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-[#1C2541] p-4 rounded-lg">
            Income
          </div>

          <div className="bg-[#1C2541] p-4 rounded-lg">
            Expenses
          </div>

          <div className="bg-[#1C2541] p-4 rounded-lg">
            Assets
          </div>
        </div>
      </main>
    </div>
  );
}