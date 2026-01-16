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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import * as React from "react"
import type { Product } from "@/types/product"
import { getProductsByPage, saveProduct } from "@/services/ProductService"
export function ProductDialog({setData, activeDialog, setActiveDialog, productEdit }:{setData:React.Dispatch<React.SetStateAction<Product[]>>, activeDialog:boolean, setActiveDialog:React.Dispatch<React.SetStateAction<boolean>>, productEdit:Product | null}) {
   const brands = [
    "Apple",
    "Samsung",
    "Microsoft",
    "Google",
    "Huawei",
    "Xiaomi",
    "Lenovo",
    "Dell",
    "HP",
    "Asus",
    "Acer",
    "Sony",
    "LG",
    "Intel",
    "AMD",
    "NVIDIA",
    "Qualcomm",
    "IBM",
    "Cisco",
    "Oracle"
  ]
  const categories = [
    "Smartphones",
    "Laptops",
    "Tablets",
    "Monitors",
    "Televisions",
    "Wearables",
    "Headphones",
    "Speakers",
    "Printers",
    "Networking",
    "Components",
    "Processors",
    "Graphics Cards",
    "Storage",
    "Peripherals",
    "Servers",
    "Software",
    "Cloud Services",
    "Smart Home",
    "Gaming"
  ]
  const [formProduct, setFormProduct] = React.useState<Product>({
    ...productEdit as Product,
    updatedAt: new Date().toISOString(),
  })
  function loadProductEdit(){
    if(productEdit){
       setFormProduct({
        ...productEdit,
        updatedAt: new Date().toISOString(),
      })
    }
  }
  function writerFormProduct(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>) {
    setFormProduct(
      {
        ...formProduct,
        [event.target.id]: event.target.value
      }
    )
  }
  async function sendForm() {
    if(formProduct.name === "" || formProduct.price! <= 0 || formProduct.stock! < 0){
      alert("Please fill in all required fields.");
      return;
    }

    await saveProduct(formProduct)
    
    console.log(formProduct)
    setData(await getProductsByPage(1))
  }

  React.useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProductEdit()
  },[productEdit])
  return(
            <Dialog open={activeDialog} onOpenChange={(open)=>{
              setActiveDialog(open)
              if(!open){
                
            setFormProduct({
              productId: undefined,
              name: "",
              brand: "",
              category: "",
              description: "",
              imageUrl: "",
              price: 0,
              stock: 0,
        updatedAt: new Date().toISOString(),
            })
          
            }}}>
      <div>
        <DialogTrigger asChild>
          <button className="rounded-[5px] w-[60%] py-2 bg-purple-600 text-white cursor-pointer " >New Product</button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[750px]">
    
        <FieldGroup>
                <FieldSet>
                  <FieldLegend>Register new Product</FieldLegend>
                  <FieldDescription>
                    All transactions are secure and encrypted
                  </FieldDescription>
                  <FieldGroup>
                      <Field>
           
                      <Input
                      type="hidden"
                        id="productId"
                        onChange={writerFormProduct}
                        value={formProduct.productId}
                      />
                    </Field>
                  <div className="grid grid-cols-3 gap-4">
      <Field>
                      <FieldLabel htmlFor="name">
                        Product Name
                      </FieldLabel>
                      <Input
                        id="name"
                        placeholder="Ipad Pro"
                        required
                        onChange={writerFormProduct}
                        value={formProduct.name}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="brand">
                        Brand
                      </FieldLabel>
                      <Select value={formProduct.brand} onValueChange={(value)=>setFormProduct({...formProduct, brand: value})}>
                          <SelectTrigger >
                            <SelectValue placeholder="Apple" />
                          </SelectTrigger>
                          <SelectContent>
                            {brands.map((brand)=>(
                              <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                    </Field>

                      <Field>
                      <FieldLabel htmlFor="category">
                        Category
                      </FieldLabel>
                      <Select value={formProduct.category} onValueChange={(value)=>setFormProduct({...formProduct, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="tablets" />
                          </SelectTrigger>
                          <SelectContent>
                          {categories.map((category)=>(
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                    </Field>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <Field>
                        <FieldLabel htmlFor="price">
                          Price
                        </FieldLabel>
                        <Input type="number" id="price" placeholder="0.00" required onChange={writerFormProduct} value={formProduct.price} />
                      </Field>
                      <Field>
                        <FieldLabel htmlFor="stock">
                          Stock
                        </FieldLabel>
                        <Input type="number" id="stock" placeholder="0.00" required onChange={writerFormProduct} value={formProduct.stock} />
                      </Field>
                      <Field>
                        <div className="grid w-full max-w-sm items-center gap-3">
            <FieldLabel htmlFor="imageUrl">Picture</FieldLabel>
      <Input id="imageUrl" placeholder="https://example.com/image.jpg" required onChange={writerFormProduct} value={formProduct.imageUrl} />    </div>
                      </Field>
                    </div>

                    <Field>
                          <div className="grid w-full gap-3">
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea placeholder="Type your message here." id="description" value={formProduct.description} onChange={writerFormProduct} />
          </div>
                    </Field>
                  </FieldGroup>
                </FieldSet>

                <Field orientation="horizontal">
                  <Button type="button" onClick={sendForm}>Submit</Button>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Field>
        </FieldGroup>


          
        </DialogContent>
      </div>
    </Dialog>
    )
}
