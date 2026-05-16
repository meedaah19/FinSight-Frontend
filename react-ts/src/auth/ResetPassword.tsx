import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {resetPassword} from "../api/userApi";
import Error from "../components/Modals/Error";
import Success from "../components/Modals/Success";
import { PageLoading } from "../components/Animations/Animation";

export default function ResetPassword() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [enteredValue, setEnteredValue] = useState({newPassword: ''});
  const [fetching, setFetching] = useState(false);

  const handleSubmit = async () => {
  try {
    setFetching(true);

    const result = await resetPassword(token!, enteredValue.newPassword);
    console.log(result);

    setSuccess(result.message || "Password reset successful!");

    setEnteredValue({ newPassword: "" });

  } catch (error: any) {
    setError(error?.message || "Something went wrong");
  } finally {
    setFetching(false);
  }
};

  useEffect(() => {
  if (success) {
    const timer = setTimeout(() => {
      setSuccess(null);

      navigate("/login");

    }, 3000);

    return () => clearTimeout(timer);
  }

  if (error) {
    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [success, error, navigate]);

  return (
    <PageLoading className="min-h-screen flex items-center justify-center px-4">

      {error && (
              <Error
                title="Error"
                description={error}
              />
            )}
      
            {success && (
              <Success
                title="Success"
                description={success}
              />
            )}

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-white shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Reset Password
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1">New Password</label>
            <input
              type="password"
              value={enteredValue.newPassword}
              onChange={(e) => setEnteredValue({ ...enteredValue, newPassword: e.target.value })}
              className="w-full px-4 py-2 rounded bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your new password"
            />
          </div>
            <button
                onClick={handleSubmit}
                disabled={fetching}
                 className="w-full bg-green-500 hover:bg-green-600 hover:scale-105 transition p-3 rounded-lg font-medium"
            >
                {fetching ? "Resetting..." : "Reset Password"}
            </button>
            <p className="text-center text-sm text-gray-400">
              Remembered your password?{" "}
              <Link to="/login" className="text-green-500 hover:text-green-600">
                Login
              </Link>
            </p>
        </div>

      </motion.div>

    </PageLoading>
  );
}