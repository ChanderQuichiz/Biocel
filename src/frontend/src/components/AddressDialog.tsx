import {
  Field,
  
  FieldLabel,

} from "@/components/ui/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import type { Address} from "@/types"
import { getAddressesByUserId, saveAddress } from "@/services/AddressService"
import { Textarea } from "@/components/ui/textarea"
export function AddressDialog({icon, userId, setAddresses, addressSelected , setAddressSelected}:{icon:string, userId:number, setAddresses:React.Dispatch<React.SetStateAction<Address[]>>, addressSelected:Address, setAddressSelected:React.Dispatch<React.SetStateAction<Address>>})  {


  const cities = [
  "Lima Metropolitana"
];

const districs = [
  "Lima Cercado",
  "Ancón",
  "Ate",
  "Barranco",
  "Breña",
  "Carabayllo",
  "Chaclacayo",
  "Chorrillos",
  "Cieneguilla",
  "Comas",
  "El Agustino",
  "Independencia",
  "Jesús María",
  "La Molina",
  "La Victoria",
  "Lince",
  "Los Olivos",
  "Lurigancho (Chosica)",
  "Lurín",
  "Magdalena del Mar",
  "Miraflores",
  "Pachacámac",
  "Pucusana",
  "Pueblo Libre",
  "Puente Piedra",
  "Punta Hermosa",
  "Punta Negra",
  "Rímac",
  "San Bartolo",
  "San Borja",
  "San Isidro",
  "San Juan de Lurigancho",
  "San Juan de Miraflores",
  "San Luis",
  "San Martín de Porres",
  "San Miguel",
  "Santa Anita",
  "Santa María del Mar",
  "Santa Rosa",
  "Santiago de Surco",
  "Surquillo",
  "Villa El Salvador",
  "Villa María del Triunfo"
];
const [addressForm, setAddressForm] = useState<Address>(
  {...addressSelected
    ,user:{userId: userId},
    addressId: addressSelected.addressId || undefined
  }
)
function changeAddressForm(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  setAddressForm({
    ...addressForm,
    [event.target.id]: event.target.value,
  })
}
  return (
    <Dialog>
      <form className="flex flex-col justify-center">
        <DialogTrigger asChild>
          <Button className="max-w-[20px] border-none shadow-none" variant="outline"><img src={icon} alt="" className="max-w-[16px]" /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          
        
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" name="address" placeholder="Av.Brasil " onChange={changeAddressForm} value={addressForm.address} />
            </div>
            <div className="grid grid-cols-2">
            <div className="grid gap-3">
              <Label htmlFor="city">City</Label>
              <Select value={addressForm.city} onValueChange={(value)=>{
                setAddressForm({
                  ...addressForm,
                  city: value
                })
              }}>
                    <SelectTrigger id="checkout-exp-month-ts6">
                      <SelectValue placeholder="Lima Metropolitana" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="district">District</Label>
              <Select value={addressForm.district} onValueChange={(value)=>{
                setAddressForm({
                  ...addressForm,
                  district: value
                })
              }}>
                    <SelectTrigger id="checkout-exp-month-ts6">
                      <SelectValue placeholder="Miraflores" />
                    </SelectTrigger>
                    <SelectContent>
                      {districs.map((district) => (
                        <SelectItem key={district} value={district}>{district}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
            </div>
            </div>


            </div>


      <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-3">
              <Label htmlFor="postalCode">Postal code</Label>
              <Input id="postalCode" name="postalCode" placeholder="381" value={addressForm.postalCode} onChange={changeAddressForm} />
              </div>
            <div className="grid gap-3">
               <Label htmlFor="phone">Phone address</Label>
              <Input id="phone" name="phone" placeholder="080000200" value={addressForm.phone} onChange={changeAddressForm} />
            </div>
      </div>
           <div className="grid gap-3">
              <Label htmlFor="addressType">Address type</Label>
       <RadioGroup value={addressForm.addressType} onValueChange={(value)=>{
        setAddressForm({
          ...addressForm,
          addressType: value as 'primary' | 'secondary'
        })
       }} className="flex flex-row">
          <Field orientation="horizontal" >
            <RadioGroupItem value="primary" id="primary" />
            <FieldLabel htmlFor="primary" className="font-normal">
              primary
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="secondary" id="secondary" />
            <FieldLabel htmlFor="secondary" className="font-normal">
              secondary
            </FieldLabel>
          </Field>

        </RadioGroup>
            </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={async () => { await saveAddress(addressForm); setAddresses(await getAddressesByUserId(userId)); 
              setAddressSelected({ ...addressSelected, addressId: undefined }) } }>Save address</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
