import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

export default function AuthCheck() {
  const navigate = useNavigate();

  useEffect(() => {
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    if (tokenExpiry && Date.now() > Number(tokenExpiry)) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiry");

      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return <Outlet />;
}