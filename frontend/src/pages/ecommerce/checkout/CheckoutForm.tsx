import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React, { useEffect, useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements,
  useStripe,
 // useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { calculateTotal } from "@/services/OrderDetail";
import {  DialogDescription } from "@radix-ui/react-dialog";
import { FieldLabel } from "@/components/ui/field";
import type { Address, OrderDetail } from "@/types";
import { getAddressesByUserId } from "@/services/AddressService";
import { Textarea } from "@/components/ui/textarea";

// Stripe pública
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const CheckoutFormInner = () => {
  const [addressSelected , setAddressSelected] = useState<number|null>(null);

  const stripe = useStripe();
 // const elements = useElements();

    const [addresses , setAddresses] = useState<Address[]>([]);
   async function fetchAddresses() {
    setAddresses(await getAddressesByUserId(JSON.parse(localStorage.getItem('account') || '{}').userId));
   }
   useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAddresses();
   },[])

  const sendPaymentData = async () => {
    if (!addressSelected) {
      alert("Please select a delivery address");
      return;
    }

    try {
      const account = JSON.parse(localStorage.getItem('account') || '{}');
      const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

      const detailsForSP = cartItems.map((item: OrderDetail) => ({
        product_id: item.productId,
        quantity: item.quantity,
        price: item.price,
        subtotal: item.subtotal
      }));
      
      const orderTransaction = {
        paymentMethod: 'card',
        details: JSON.stringify(detailsForSP),
        order: {
          user: {
            userId: account.userId
          },
          address: {
            addressId: addressSelected
          },
          total: calculateTotal(),
          estimatedDelivery: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
        }
      };

      const orderResponse = await fetch("http://localhost:8020/order/createorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderTransaction),
      });

      if (!orderResponse.ok) {
        const errorMessage = await orderResponse.text();
        alert("Error creating order: " + errorMessage);
        return;
      }

      alert("Order created successfully!");
      localStorage.removeItem('cart');
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred: " + (error as Error).message);
    }
  };

  return (
    <div className="max-w-[700px] space-y-4">
      <DialogDescription>Information payment</DialogDescription>
              <div className="font-medium flex flex-row bg-gray-200 justify-between p-4 mb-4 rounded-md">
          <p>TOTAL:</p>
          <p>PEN {calculateTotal().toFixed(2)}</p>
        </div>
        {addresses.length>0&&
        <div>
        <div className="flex flex-row gap-8">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Choose you address </label>
<div className="max-w-[20px]">
         <Select value={addressSelected?.toString()} onValueChange={(value)=>{
            setAddressSelected(parseInt(value))
         }}>
          

      <SelectTrigger>
        <SelectValue placeholder="address" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>address</SelectLabel>
          
          {addresses.map((address) => (
            <SelectItem  key={address.addressId} value={address.addressId!.toString()}>
                <p>{address.addressId}</p>

            </SelectItem>
        
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>

</div>
</div> 
{addressSelected && <Textarea className="mt-2" value={
  (
    
    addresses.find(address=>address.addressId===addressSelected)?.district)
    +", " + addresses.find(address=>address.addressId===addressSelected)?.address
}
 disabled>
</Textarea>}

</div>
}
{addresses.length===0&&<p className="text-red-500">You need to add an address to continue with the purchase</p>}


        <div>
      
        <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
        <div className="border rounded-md p-3 bg-white">
          <CardNumberElement options={{ showIcon: true, }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
          <div className="border rounded-md p-3 bg-white">
            <CardExpiryElement />
          </div>
        </div>
        <div>
          <FieldLabel className="block text-sm font-medium text-gray-700 mb-1">CVC</FieldLabel>
          <div className="border rounded-md p-3 bg-white">
            <CardCvcElement  />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={sendPaymentData}
        disabled={!stripe}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        Pay now
      </button>
    </div>
  );
};

export default function CheckoutForm() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutFormInner />
    </Elements>
  );
}
