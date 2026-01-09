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

import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { Textarea } from "@headlessui/react"
import { Switch } from "./ui/switch"
export function CategoryDialog(){
        return(
                <Dialog>
          <form>
            <DialogTrigger asChild>
              <button className="rounded-[5px] w-[60%] py-2 bg-purple-600 text-white cursor-pointer ">New Category</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[520px]">
        
      <FieldGroup>
              <FieldSet>
                <FieldLegend>Register new Category</FieldLegend>
                <FieldDescription>
                  All transactions are secure and encrypted
                </FieldDescription>
               <FieldGroup>
                <Field>
                <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                  Category Name
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-name-43j"
                  placeholder="Evil Rabbit"
                  required
                />
                </Field>
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
    </div></Field>

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