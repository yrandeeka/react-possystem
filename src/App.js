import "./App.css";
import Users from "./pages/User";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from "./pages/Home";
import Supplier from "./pages/Supplier";
import Category from "./pages/Category";
import Customer from "./pages/Customer";
import Item from "./pages/Item";
import Payment from "./pages/Payment";
import Invoice from "./pages/Invoice";
import Sidebar from "./templates/sidebar";
import Login from "./pages/Login";

function App() {

  return (
    <div className="App">
     <BrowserRouter>
        <MainContent />
      </BrowserRouter>
    </div>
  );
}

function MainContent() {
  // Custom hook to get the current location
  const location = useLocation();

  // Determine if the current path is '/login'
  const isLoginPage = location.pathname === '/login';

  return (
    <>
      {isLoginPage ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <Sidebar>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/suppliers" element={<Supplier />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/items" element={<Item />} />
            <Route path="/payments" element={<Payment />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Sidebar>
      )}
    </>
  );
}


export default App;
