import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import CustomerRoutes from "./Routes/CustomerRoutes";
import AdminRouters from "./Routes/AdminRouters";

function App() {

  const { auth } = useSelector((store) => store);
  const role = localStorage.getItem("role");

  return (
    <Routes>
  <Route path="/*" element={<CustomerRoutes />} />
  <Route path="/admin/*" element={<AdminRouters />} />
</Routes>
  );
}

export default App;