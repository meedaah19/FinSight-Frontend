import { useEffect, useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    loading?: boolean;
    initialData?: any;

};

export default function ExpenseModal({ open, onClose, onSubmit, loading, initialData }: Props) {
    const [form, setForm] = useState({
    type: "income",
    amount: "",
    category: "food",
    description: "",
    currency: "NGN",
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
        ...form,
        amount: Number(form.amount),
    });
    };

    useEffect(() => {
    if (!open) {
        setForm({
        type: "income",
        amount: "",
        category: "food",
        description: "",
        currency: "NGN",
        });
    }
    }, [open]);

    useEffect(() => {
      if (initialData) {
        setForm({
          type: initialData.type,
          amount: initialData.amount.toString(),
          category: initialData.category,
          description: initialData.description,
          currency: initialData.currency,
        });
      }
    }, [initialData]);

  if (!open) return null;

  return (
    <div 
    className="fixed inset-0 bg-black/20 backdrop-blur flex items-center justify-center z-50">
      
      <div className="bg-[#1C2541] p-6 rounded-xl w-100 text-white">

        <h2 className="text-xl font-semibold mb-4">
          Add Transaction
        </h2> 

        {/* TYPE */}
        <form 
        onSubmit={handleSubmit}>
        <select
          className="w-full p-2 mb-3 bg-[#0B132B] rounded"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
         <option value="asset">Asset</option>
        </select>

        {/* AMOUNT */}
        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 mb-3 bg-[#0B132B] rounded"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />

        {/* CATEGORY */}
        <select
          className="w-full p-2 mb-3 bg-[#0B132B] rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="food">Food</option>
          <option value="transport">Transport</option>
          <option value="bills">Bills</option>
          <option value="airtime">Airtime</option>
          <option value="shopping">Shopping</option>
          <option value="others">Others</option>
        </select>

        {/* DESCRIPTION */}
        <input
          type="text"
          placeholder="Description"
          className="w-full p-2 mb-3 bg-[#0B132B] rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        {/* CURRENCY */}
        <select
          className="w-full p-2 mb-4 bg-[#0B132B] rounded"
          value={form.currency}
          onChange={(e) => setForm({ ...form, currency: e.target.value })}
        >
          <option value="NGN">NGN</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>

        {/* BUTTONS */}
        <div className="flex gap-2">
          
          <button
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 flex-1 py-2 rounded"
          >
           {loading ? 
           initialData
              ? "Updating..."
              : "Adding..."
            : initialData
            ? "Update Transaction"
            : "Add Transaction"}
          </button>

          <button
            onClick={onClose}
            className="bg-red-500 hover:bg-red-600 flex-1 py-2 rounded"
          >
            Cancel
          </button>
          

        </div>
        </form>
      </div>
    </div>
  );
}