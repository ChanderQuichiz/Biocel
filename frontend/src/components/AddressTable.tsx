import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AddressDialog } from "./AddressDialog"
import type { Address } from "@/types"
import {  useEffect, useState } from "react"
import { deleteAddress, getAddressesByUserId } from "@/services/AddressService"
import { Button } from "@headlessui/react"


export function AddressTable({userId}:{userId:number}) {
  const [addressSelected, setAddressSelected] = useState<Address >({
    address: "",
    city: "",
    district: "",
    postalCode: "",
    phone: "",
    addressType: "primary"
  });
    const [addresses, setAddresses] = useState<Address[]>([
    {addressId:1, address: "123 Main St, Lima Cercado", city: "Lima Metropolitana", district: "Lima Cercado", postalCode: "15001", phone: "987654321", addressType: "primary"},
    {addressId:2, address: "456 Elm St, Miraflores", city: "Lima Metropolitana", district: "Miraflores", postalCode: "15074", phone: "912345678", addressType: "secondary"},
  ])
async function fetchAddresses(userId:number) {
  setAddresses(await getAddressesByUserId(userId));
}
useEffect(()=>{
  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchAddresses(userId);
},[])
  return (
    <Table className="m-auto min-w-[400px] w-auto cursor-pointer">
      <TableCaption>A list of your recent addresses.</TableCaption>
      <TableHeader className="cursor-auto">
        <TableRow>
          <TableHead className="text-[20px]">My Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {addresses.map((address) => (
          <TableRow key={address.addressId}>
            <TableCell className="font-medium flex flex-row justify-between align-middle "><div><p className="text-[18px] text-blue-950"> Address {address.addressId}</p><p className=" font-light">{address.district}</p><p className="font-light">{address.address} ...</p> </div>
            <div className="flex flex-row gap-2 ">
                          <AddressDialog userId={userId} icon={'https://cdn-icons-png.flaticon.com/128/10337/10337385.png'} setAddresses={setAddresses} addressSelected={address} setAddressSelected={setAddressSelected} />
            <Button onClick={async()=>{
             await deleteAddress(address.addressId!);
              setAddresses( await getAddressesByUserId(userId));
              setAddressSelected(address)
            }}><img src="https://cdn-icons-png.flaticon.com/128/14035/14035561.png" alt="" className="max-w-[20px]" /></Button>
            </div>


            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell  className="flex flex-row justify-between">Add new address 
            <AddressDialog userId={userId} icon={'https://cdn-icons-png.flaticon.com/128/11741/11741042.png'} setAddresses={setAddresses} addressSelected={addressSelected} setAddressSelected={setAddressSelected} />
            </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
