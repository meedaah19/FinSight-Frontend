import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function AuthCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    if (!token || !tokenExpiry || Date.now() > Number(tokenExpiry)) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");

      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return <Outlet />;
}