import * as React from "react";
import { AddressTable } from "./AddressTable";
import type { User } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
export function UserInfo() {

  const navigate = useNavigate()
  const [accountData, setAccountData] = React.useState<User>(JSON.parse(localStorage.getItem("account") || "{}"));
  function writerAccountData(event: React.ChangeEvent<HTMLInputElement>) {
    setAccountData({
      ...accountData,
      [event.target.id]: event.target.value,
    })
  }
  async function sendChangeAccountData() {
   if(accountData.email === "" || accountData.firstName === "" || accountData.lastName === "" || accountData.password === ""){
    alert("Please fill in all required fields.");
    return;
   }
  const response = await fetch(`http://localhost:8020/user/save`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountData)
  })
  if(response.ok){
    const data = await response.json();
    localStorage.setItem("account", JSON.stringify(data));
    alert("Account data updated successfully.");
  }
  else{
    alert("Failed to update account data. Please try again.");
  }
}
 React.useEffect(()=>{
  if (!accountData.userId) navigate("/account/signin")
 },[])
 return(
    
      <div className="grid grid-cols-1 sm:grid-cols-2 px-4">
            <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
          <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive mail.</p>
          <input type="hidden" id="userId" value={accountData.userId}/>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={accountData.firstName}
                  onChange={writerAccountData}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="lastName" className="block text-sm/6 font-medium text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={accountData.lastName}
                  onChange={writerAccountData}
                />
              </div>
            </div>
      
          </div>

     <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
               <div className="sm:col-span-3">
              <label htmlFor="phone" className="block text-sm/6 font-medium text-gray-900">
                Phone number
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  type="text"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={accountData.phone}
                  onChange={writerAccountData}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={accountData.email}
                  onChange={writerAccountData}
                />
              </div>
            </div>

        
      
          </div>
  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
               <div className="sm:col-span-3">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  autoComplete="family-name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={accountData.password}
                  onChange={writerAccountData}
                />
              </div>
              
            </div>
      <div className=" sm:col-span-3 ">
        <Button className="bg-blue-500 cursor-pointer hover:bg-blue-400 text-white rounded-[5px] block w-full mt-8 h-[35px]" onClick={sendChangeAccountData}>Save</Button>
      </div>
          </div>

        </div>
        <div className="w-full h-full">
          <AddressTable userId={accountData.userId}  />
        </div>

      </div>

    )
}