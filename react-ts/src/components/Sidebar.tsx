import { useEffect, useState } from "react";
import ExpenseModal from "./Modals/ExpenseModal";
import { CreateExpense } from "../api/expenseApi";
import { useNavigate } from "react-router-dom";
import Success from "./Modals/Success";
import Error from "./Modals/Error";
import { Logout } from "../api/userApi";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
    const [menuOpen, setMenuOpen] = useState(false);
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
            navigate(0)

            setOpen(false); 

        } catch (err: any) {
            setError(err.message || "Error creating expense");
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            const result = await Logout();
             setSuccess(result.message || "Logged out successfully");

            navigate("/login");
        } catch (err: any) {
            setError(err.message || "Error during logout");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
    if (success || error || warning) {
        const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
        setWarning(null);
        }, 3000);

        return () => clearTimeout(timer);
    }
    }, [success, error, warning]);
  

    return(
        <div>
        {success && <Success title="Success" description={success} />}
        {error && <Error title="Error" description={error} />}
        {warning && <Error title="Warning" description={warning} />}
        <div className="md:hidden flex flex-col gap-2 p-2 bg-[#1C2541] text-white">
        {/* <h1 className="text-md  font-bold">FinSight</h1> */}

        <button onClick={() => setMenuOpen(true)}>
            <Menu size={20} />
        </button>
        {menuOpen && (
        <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
        )}
        </div>
        
        <aside 
        className={`
            fixed top-0 left-0 h-screen w-64 bg-[#1C2541] p-6 flex flex-col gap-6
            transform transition-transform duration-300 z-50
            ${menuOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
        `}>
            <div className="md:hidden flex justify-end">
            <button onClick={() => setMenuOpen(false)}>
                <X size={20} />
            </button>
            </div>
            <h1 className="text-xl font-bold text-white">
             FinSight
            </h1>

            <nav className="flex flex-col gap-4">

            <button 
            onClick={() => {navigate("/dashboard"); setMenuOpen(false);}}
            
            className="text-left hover:text-blue-400">
                Overview
            </button>

             <button 
            onClick={() => {navigate("/dashboard/profile"); setMenuOpen(false);}}
            className="text-left hover:text-blue-400">
                Profile
            </button>

            <button 
            onClick={() => {navigate("/dashboard/expenses"); setMenuOpen(false);}}
            className="text-left hover:text-blue-400">
                Transactions
            </button>

            <button 
            onClick={() => {navigate("/dashboard/analytics"); setMenuOpen(false);}}
            className="text-left hover:text-blue-400">
                Analytics
            </button>
            </nav>
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }} 
            onClick={() => { setOpen(true); setMenuOpen(false); }}
            className="mt-auto bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
            + Add Transaction
            </motion.button>
            <button
            onClick={() => { handleLogout(); setMenuOpen(false); }}
            className="text-left hover:text-blue-400"
            >
            Logout
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