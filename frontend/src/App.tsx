import Dashboard from "./pages/Dashboard";
import { UserInfo } from "./components/UserInfo";
import { Account } from "./pages/Account";
import Checkout from "./pages/Checkout";
import { Ecommerce } from "./pages/Ecommerce";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { Reports } from "./pages/Reports";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
  <Routes>
    <Route element={<Ecommerce/>}>
      <Route path={"/home/:page"} element={<Home/>}/>
      <Route index element={<Home/>}/>
      <Route path="checkout" element={<Checkout/>}/>
      <Route path="account" element={<Account/>}>
          <Route path="userinfo" element={<UserInfo/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="signin" element={<SignIn/>}/>
      </Route>
    </Route>
    <Route path="dashboard" element={<Dashboard/>}>
        <Route path="account" element={<UserInfo/>}/>
        <Route path="products" element={<Products/>}/>
        <Route index element={<Reports/>}/>
        <Route path="reports" element={<Reports/>}/>
        
    </Route>
  </Routes>
  );
}
