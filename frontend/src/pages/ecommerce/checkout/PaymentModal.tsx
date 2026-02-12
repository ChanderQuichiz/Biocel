
import { Dialog, DialogContent, DialogTrigger } from "../../../components/ui/dialog"
import CheckoutForm from "./CheckoutForm"

import { useNavigate } from "react-router-dom";
export function PaymentModal() {
  const navigate = useNavigate();
  function verifyAccount(){
    const user = localStorage.getItem("account");
    if(!user){
      navigate("/account/signin");
    }
  }
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button onClick={verifyAccount} className="rounded-[5px] w-full py-2 bg-purple-600 text-white cursor-pointer ">Checkout</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
<CheckoutForm/>

          
        </DialogContent>
      </form>
    </Dialog>
  )
}
