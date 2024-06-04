import "./App.css";
import Users from "./pages/User";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
  //application parent component
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/suppliers" element={<Supplier />} />
            <Route path="/categories" element={<Category />} />
            <Route path="/customers" element={<Customer />} />
            <Route path="/items" element={<Item />} />
            <Route path="/payments" element={<Payment />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  );
}

export default App;
