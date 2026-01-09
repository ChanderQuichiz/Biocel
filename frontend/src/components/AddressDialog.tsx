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
export function AddressDialog({icon}:{icon:string}) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline"><img src={icon} alt="" className="max-h-[18px]" /></Button>
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
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid grid-cols-2">
            <div className="grid gap-3">
              <Label htmlFor="username-1">Ciudad</Label>
              <Select defaultValue="">
                    <SelectTrigger id="checkout-exp-month-ts6">
                      <SelectValue placeholder="..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01">Samsung</SelectItem>
                      <SelectItem value="02">Apple</SelectItem>
                      <SelectItem value="03">Sony</SelectItem>
                    </SelectContent>
                  </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Distrito</Label>
              <Select defaultValue="">
                    <SelectTrigger id="checkout-exp-month-ts6">
                      <SelectValue placeholder="..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="01">Samsung</SelectItem>
                      <SelectItem value="02">Apple</SelectItem>
                      <SelectItem value="03">Sony</SelectItem>
                    </SelectContent>
                  </Select>
            </div>
            </div>

           <div className="grid gap-3">
              <Label htmlFor="username-1">Vivvienda</Label>
       <RadioGroup defaultValue="monthly">
          <Field orientation="horizontal">
            <RadioGroupItem value="monthly" id="plan-monthly" />
            <FieldLabel htmlFor="plan-monthly" className="font-normal">
              Department
            </FieldLabel>
          </Field>
          <Field orientation="horizontal">
            <RadioGroupItem value="yearly" id="plan-yearly" />
            <FieldLabel htmlFor="plan-yearly" className="font-normal">
Home            </FieldLabel>
          </Field>

        </RadioGroup>
            </div>
            </div>



            <div className="grid gap-3">
              <Label htmlFor="username-1">Referencia</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
