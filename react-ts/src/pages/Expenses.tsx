import { useEffect, useState } from "react";
import { GetExpenses, DeleteExpense, UpdateExpense } from "../api/expenseApi";
import ExpenseModal from "../components/Modals/ExpenseModal";
import Success from "../components/Modals/Success";
import Error from "../components/Modals/Error";
import Sidebar from "../components/Sidebar";
import { PageLoading, RevealGroup, RevealItem } from "../components/Animations/Animation";
import { motion } from "framer-motion";

export default function Expenses() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async () => {
    const data = await GetExpenses();
    setExpenses(
      Array.isArray(data.expenses)
        ? data.expenses
        : data.expenses
        ? [data.expenses]
        : []
    );
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);

      const result = await DeleteExpense(id);

      setSuccess(result.message || "Expense deleted successfully");
      fetchExpenses();
      
    } catch (error: any) {
      setError(error.message || "Error deleting expense");

    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: string, updatedData: any) => {
    try {
      setLoading(true);

      const result = await UpdateExpense(id, updatedData);

      setSuccess(result.message || "Expense updated successfully");

      setOpenEditModal(false);
      fetchExpenses();
    } catch (error: any) {
      setError(error.message || "Error updating expense");

    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    if (success || error) {
        const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
        }, 3000);

        return () => clearTimeout(timer);
    }
    }, [success, error]);

  return (
    <PageLoading className="flex min-h-screen bg-[#0B132B] text-gray-200">
          <Sidebar/>
    <div className="flex-1 p-4 md:p-8 md:ml-64 ">
      <h2 className="text-2xl font-semibold mb-6 mt-4 md:mt-0">All Transactions</h2>
       {success && <Success title="Success" description={success} />}
       {error && <Error title="Error" description={error} />}
      <RevealGroup className="space-y-3">
        {expenses.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          expenses.map((exp) => (
            <RevealItem
              key={exp._id}
              className="bg-[#1C2541] p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {exp.type} - {exp.amount}
                </p>
                <p className="text-sm text-gray-400">
                  {exp.category} • {exp.description}
                </p>
              </div>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedExpense(exp);
                    setOpenEditModal(true);
                  }}
                  className="bg-yellow-500 px-3 py-1 rounded"
                >
                  Edit
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(exp._id)}
                  className="bg-red-500 px-3 py-1 rounded"
                >
                  {loading ? "Deleting..." : "Delete"}
                </motion.button>
              </div>
            </RevealItem>
          ))
        )}

        {openEditModal && selectedExpense && (
          <ExpenseModal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            onSubmit={(data) => handleEdit(selectedExpense._id, data)}
            initialData={selectedExpense}
            loading={loading}
          />
        )}
      </RevealGroup>
    </div>
    </PageLoading>

  );
}