import Dashboard from "./pages/dashboard/Dashboard";
import { UserInfo } from "./components/UserInfo";
import { Account } from "./pages/ecommerce/account/Account";
import Checkout from "./pages/ecommerce/checkout/Checkout";
import { Ecommerce } from "./pages/ecommerce/Ecommerce";
import { Home } from "./pages/ecommerce/home/Home";
import { Products } from "./pages/dashboard/products/Products";
import { Reports } from "./pages/dashboard/reports/Reports";
import { SignIn } from "./pages/ecommerce/signin/SignIn";
import { SignUp } from "./pages/ecommerce/signup/SignUp";
import { Routes, Route } from "react-router-dom";
import Search from "./pages/ecommerce/search/Search";
import { Orders } from "./pages/ecommerce/orders/Orders";
export default function App() {
  return (
  <Routes>
    <Route element={<Ecommerce/>}>
      <Route path={"/search/:text"} element={<Search/>}/>
      <Route path={"/home/:page"} element={<Home/>}/>
      <Route index element={<Home/>}/>
      <Route path="orders" element={<Orders/>}/>
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
