import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SignUp from "./auth/signup";
import Login from "./auth/login";
import Dashboard from "./pages/Dashboard";
import Expenses from "./pages/Expenses";
import Profile from "./pages/Profile";
import Analytics from "./pages/Analytics";
import AuthCheck from "./auth/AuthCheck";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
       path: "/",
       element: <Home/>, 
      },
      {
        path: "signup",
        element: <SignUp/>,
      },
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword/>,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword/>
      },
      {
        element: <AuthCheck/>,
        children: [
          {
            path: "dashboard",
            element: <Dashboard/>,
          },
          {
                path: "dashboard/expenses",
                element: <Expenses/>
            },
            {
              path: "dashboard/profile",
              element: <Profile/>
            },
            {
              path: "dashboard/analytics",
              element: <Analytics/>
            }
        ]
      }
    ],
  },
]);

export default function App() {

  return (
    <RouterProvider router={router} />
)};