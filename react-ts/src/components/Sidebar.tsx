import { useEffect, useState } from "react";
import ExpenseModal from "./Modals/ExpenseModal";
import { CreateExpense } from "../api/expenseApi";
import { useNavigate } from "react-router-dom";
import Success from "./Modals/Success";
import Error from "./Modals/Error";

export default function Sidebar() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [warning, setWarning] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCreateExpense = async (data: any) => {
        setLoading(true);
        try {
            const result = await CreateExpense(data);

            setSuccess(result.message || "Expense created successfully");

            if (result.warning) {
            setWarning(result.warning);
            }

            setOpen(false); 

        } catch (err: any) {
            setError(err.message || "Error creating expense");
        }
        setLoading(false);
    };

    useEffect(() => {
    if (success || error || warning) {
        const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
        setWarning(null);
        }, 5000);

        return () => clearTimeout(timer);
    }
    }, [success, error, warning]);
  

    return(
        <div>
        {success && <Success title="Success" description={success} />}
        {error && <Error title="Error" description={error} />}
        {warning && <Error title="Warning" description={warning} />}
        <aside className="w-64 bg-[#1C2541] p-6 flex flex-col gap-6">
            <h1 className="text-xl font-bold text-white">
            Smart Expense
            </h1>

            <nav className="flex flex-col gap-4">
            <button className="text-left hover:text-blue-400">
                Profile
            </button>

            <button className="text-left hover:text-blue-400">
                Overview
            </button>

            <button 
            onClick={() => navigate("/dashboard/expenses")}
            className="text-left hover:text-blue-400">
                Expenses
            </button>

            <button className="text-left hover:text-blue-400">
                Analytics
            </button>
            </nav>
            <button 
            onClick={() => setOpen(true)}
            className="mt-auto bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
            + Add Expense
            </button>
        </aside>

        <ExpenseModal 
            open={open}
            onClose={() => setOpen(false)}
            onSubmit={handleCreateExpense}
            loading={loading}
            />
            
        </div>
    )
}