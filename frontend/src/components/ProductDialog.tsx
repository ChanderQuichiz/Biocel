import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,

  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Textarea } from "@headlessui/react"
import { Switch } from "./ui/switch"
export function ProductDialog(){
   /* productId: string;
    productName: string;
    brand: brand;
    category: category;
    description: string;
    price: number;
    stock: number;
    status: "active" | "inactive";
    image: string; */
    return(
            <Dialog>
      <form>
        <DialogTrigger asChild>
          <button className="rounded-[5px] w-[60%] py-2 bg-purple-600 text-white cursor-pointer ">New Product</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[750px]">
    
  <FieldGroup>
          <FieldSet>
            <FieldLegend>Register new Product</FieldLegend>
            <FieldDescription>
              All transactions are secure and encrypted
            </FieldDescription>
            <FieldGroup>
              
            <div className="grid grid-cols-3 gap-4">
<Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Product Name
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="Evil Rabbit"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Brand
                </FieldLabel>
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
              </Field>

                <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  Category
                </FieldLabel>
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
              </Field>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="checkout-exp-month-ts6">
                    Price
                  </FieldLabel>
                  <Input type="number" id="checkout-exp-month-ts6" placeholder="..." required />
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                    Stock
                  </FieldLabel>
                  <Input type="number" id="checkout-7j9-exp-year-f59" placeholder="..." required />
                </Field>
                <Field>
                  <div className="grid w-full max-w-sm items-center gap-3">
      <FieldLabel htmlFor="picture">Picture</FieldLabel>
      <Input id="picture" type="file" />
    </div>
                </Field>
              </div>
              <Field>
                    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <FieldLabel htmlFor="airplane-mode">Active</FieldLabel>
    </div>
              </Field>
              <Field>
                    <div className="grid w-full gap-3">
      <FieldLabel htmlFor="message">Description</FieldLabel>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
              </Field>
            </FieldGroup>
          </FieldSet>

          <Field orientation="horizontal">
            <Button type="submit">Submit</Button>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Field>
        </FieldGroup>


          
        </DialogContent>
      </form>
    </Dialog>
    )
}