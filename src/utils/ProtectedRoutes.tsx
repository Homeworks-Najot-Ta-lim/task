import { useContext } from "react";
import { Context } from "../contexts/Context";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const { token } = useContext(Context);
  return (
    <>
      {token ? <Outlet /> : <Navigate to="/" />}
    </>
  );
};

export default ProtectedRoutes;
