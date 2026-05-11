import { useEffect, useState } from "react";
import { DeleteProfile, GetProfile, UpdateProfile } from "../api/userApi";
import Success from "../components/Modals/Success";
import Error from "../components/Modals/Error";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    budget: "",
  });

  const fetchProfile = async () => {
    const data = await GetProfile();
    setUser(data);

    setForm({
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      budget: data.budget,
    });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await UpdateProfile(form);

      setEditing(false);
      fetchProfile();
      setSuccess(result.message || "Profile updated successfully");
    } catch (error: any) {
      setError(error.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

        const result = await DeleteProfile();

        setSuccess(result.message || "Account deleted successfully");
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        window.location.href = "/login";
    } catch (error: any) {
      setError(error.message || "Error deleting account");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success || error ) {
        const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
        }, 3000);

        return () => clearTimeout(timer);
    }
  })

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 text-white max-w-4xl mx-auto">
      <h2 className="text-2xl mb-6">Profile</h2>

      {!editing ? (
        <div className="bg-[#1C2541] p-6 rounded-lg">
            <div className="flex flex-col gap-5">
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>PhoneNumber: {user.phoneNumber}</p>
            <p>Budget: {user.budget}</p>
            </div>
         
            {success && <Success title="Success" description={success} />}
            {error && <Error title="Error" description={error} />}

            <div className="flex justify-between mt-6">
            <button
                onClick={() => setEditing(true)}
                className="mt-4 bg-yellow-500 px-4 py-2 rounded"
            >
                Edit
            </button>

            <button
                onClick={handleDelete}
                className="mt-4 bg-danger px-4 py-2 rounded"
            >
                {loading ? "Deleting..." : "Delete Account"}
            </button>
            </div>
          
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-[#1C2541] p-6 rounded-lg space-y-4"
        >
          <input
            className="w-full p-2 bg-[#0B132B] rounded"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="w-full p-2 bg-[#0B132B] rounded"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className="w-full p-2 bg-[#0B132B] rounded"
            value={form.phoneNumber}
            onChange={(e) =>
              setForm({ ...form, phoneNumber: e.target.value })
            }
          />

          <input
            className="w-full p-2 bg-[#0B132B] rounded"
            value={form.budget}
            onChange={(e) =>
              setForm({ ...form, budget: e.target.value })
            }
          />

          <button
            className="bg-blue-500 px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Updating..." : "Save"}
          </button>
        </form>
      )}
    </div>
  );
}