import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {login} from "../api/userApi";
import Error from "../components/Modals/Error";
import Success from "../components/Modals/Success";
import { PageLoading } from "../components/Animations/Animation";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [enteredValue, setEnteredValue] = useState({
  email: '',
  password: ''
  })
  const [fetching, setFetching] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) =>{
  e.preventDefault()
  const email = enteredValue.email;
  const password = enteredValue.password;

  try {
    setFetching(true)
    const result = await login({email, password, Date})
          setSuccess((result as any).message || "Login successful!");
            setEnteredValue({
            email: "",
            password: "",
        })
        }catch(error: any){
          setError(error?.message || "Something went wrong");
        } finally {
            setFetching(false);
        }
  }

  useEffect(() => {
  if (success) {
    const timer = setTimeout(() => {
      setSuccess(null);

      navigate("/dashboard");

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
          Welcome back!
        </h2>

        {/* Form */}
        <form 
        onSubmit={handleSubmit}
        className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-400"
            value={enteredValue.email}
            onChange={(e) => setEnteredValue({...enteredValue, email: e.target.value})}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-green-400"
            value={enteredValue.password}
            onChange={(e) => setEnteredValue({...enteredValue, password: e.target.value})}
          />

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 hover:scale-105 transition p-3 rounded-lg font-medium"
          >
          {fetching ? 'Logging In' : 'Log in'}
          </button>

        </form>

        <p className="text-sm text-center mt-4 text-gray-300">
          Don't have an account? <Link to="/Signup" className="text-green-500 hover:text-green-600">Sign Up</Link>
        </p>

      </motion.div>

    </PageLoading>
  );
}