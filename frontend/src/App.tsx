import Dashboard from "./components/Dashboard";
import { UserInfo } from "./components/UserInfo";
import { Account } from "./pages/Account";
import { Brands } from "./pages/Brands";
import { Categories } from "./pages/Categories";
import Checkout from "./pages/Checkout";
import { Ecommerce } from "./pages/Ecommerce";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
  <Routes>
    <Route path="/" element={<Ecommerce/>}>
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
      <Route path="maintenance">
        <Route path="products" element={<Products/>}/>
                <Route path="categories" element={<Categories/>}/>
                                <Route path="brands" element={<Brands/>}/>


      </Route>
    </Route>
  </Routes>
  );
}
