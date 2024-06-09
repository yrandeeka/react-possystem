import "./App.css";
import Users from "./pages/User";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
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
import AuthGuard from "./utils/AuthGuard";
import GuestGuard from "./utils/GuestGuard";

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
  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {console.log("isLoginPage-", isLoginPage)}
      {!isLoginPage ? (
        <Sidebar>
            <Routes>
              <Route path="/users" element={<AuthGuard children={<Users />}/>} />
              {/* <Route path="/users" element={<Users />}/> */}
              <Route path="/suppliers" element={<AuthGuard children={<Supplier />}/>} />
              <Route path="/categories" element={<AuthGuard children={<Category />}/>} />
              <Route path="/customers" element={<AuthGuard children={<Customer />}/>}/>
              <Route path="/items" element={<AuthGuard children={<Item />}/>} />
              <Route path="/payments" element={<AuthGuard children={<Payment />}/>} />
              <Route path="/invoice" element={<AuthGuard children={<Invoice />}/>} />
              <Route path="/" element={<AuthGuard children={<Home />}/>} />
            </Routes>
        </Sidebar>
      ) : (
          <Routes>
            <Route path="/login" element={<GuestGuard children={<Login />}/>} />
          </Routes>
      )}
    </>
  );
}

export default App;
