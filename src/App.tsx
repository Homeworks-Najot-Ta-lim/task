import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import { ToastContainer } from "react-toastify";

function App() {
  return (
<>
<Routes>
      <Route element={<LoginPage />} path="/" />
      
      <Route element={<ProtectedRoutes />}>
        <Route element={<MainPage />} path="/companies" />
      </Route>
      
      <Route element={<NotFound />} path="*" />
    </Routes>
    <ToastContainer position="bottom-right"/>
</>

  );
}

export default App;
