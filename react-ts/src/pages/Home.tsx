import {motion} from "framer-motion"
import { useNavigate } from "react-router-dom";
import { PageLoading } from "../components/Animations/Animation";
import { Wallet, BarChart3, PiggyBank, TrendingUp, Eye } from "lucide-react";

export default function Home() {
    const navigate = useNavigate();

    const handleCreateAccount = () => {
        navigate("/signup");
    }
    const handleSignIn = () => {
        navigate("/login");
    }

  return (
    <PageLoading className="relative">
    <div className="absolute inset-0 min-h-screen bg-[url('/background.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70 "/>
         <div className="relative z-10 md:py-5 py-25 min-h-screen">
        <div className="w-full px-4 sm:px-6 md:px-0 md:max-w-3xl md:mx-auto text-center">
            <h1 className="font-bold text-4xl text-text-primary"> Welcome to FinSight</h1>
            <p className="mt-4 font-medium text-text-primary">Track smarter. <strong>Spend wiser.</strong> </p>

            <div className="flex flex-col md:mt-7 mt-10 md:space-y-3 space-y-5">
                <motion.div 
                whileHover={{
                    y: -10,
                    scale: 1.05,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                }}
                className="border w-full max-w-md font-medium mx-auto flex md:gap-5 gap-3 rounded-2xl shadow-2xl text-text-primary p-3">
                <Wallet className="text-blue-400" size={20} />
                   Financial clarity starts here.
                </motion.div>
                <motion.div 
                whileHover={{
                    y: -10,
                    scale: 1.05,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                }}
                className="border w-full max-w-md flex font-medium mx-auto md:gap-5 gap-3 rounded-2xl shadow-2xl text-text-primary p-3">
                <BarChart3 className="text-green-400" size={20} />
                    Your personal finance insight dashboard.
                </motion.div>
                <motion.div 
                whileHover={{
                    y: -10,
                    scale: 1.05,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 15,
                }}
                className="border w-full max-w-md flex font-medium mx-auto md:gap-5 gap-3 rounded-2xl shadow-2xl text-text-primary py-3 pl-3">
                <TrendingUp className="text-yellow-400" size={20} />
                   Turn your spending into smarter decisions.
                </motion.div>
                <motion.div 
                    whileHover={{
                        y: -10,
                        scale: 1.05,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                    }}
                    className="border w-full max-w-md flex font-medium mx-auto md:gap-5 gap-3 rounded-2xl shadow-2xl text-text-primary p-3">
                    <PiggyBank className="text-pink-400" size={20} />
                        Your personal finance insight dashboard.
                    </motion.div>
                    <motion.div 
                    whileHover={{
                        y: -10,
                        scale: 1.05,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                    }}
                    className="border w-full max-w-md flex font-medium mx-auto md:gap-5 gap-3 rounded-2xl shadow-2xl text-text-primary p-3">
                    <Eye className="text-purple-400" size={20} />
                    See your money differently.
                    </motion.div>
                </div>

            <div className="flex flex-col md:mt-5 mt-10 space-y-5">
                <button 
                onClick={handleCreateAccount} 
                className="border bg-blue-500 hover:bg-blue-600 w-full max-w-md hover:scale-105 transition mx-auto gap-5 rounded-2xl shadow-2xl text-text-primary font-medium px-5 py-3 flex justify-center">Create Account</button>
                <button 
                onClick={handleSignIn} 
                className="border hover:bg-black/50 w-full max-w-md mx-auto hover:scale-105 transition  gap-5 rounded-2xl shadow-2xl text-text-primary font-medium px-5 py-3 flex justify-center">Sign In</button>
            </div>
        </div>
        </div>
    </div>
    </PageLoading>
  );
}