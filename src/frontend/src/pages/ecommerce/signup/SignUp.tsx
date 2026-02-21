
import { useEffect } from "react";
import { SignupForm } from "./signup-form";

export function SignUp() {
    useEffect(() => {
      const account = JSON.parse(localStorage.getItem('account')||'{}');
      if(account.userId ){
        window.location.href = "/account/userinfo"
      }
    }, []);
  return (

    <SignupForm/>


  );
}
