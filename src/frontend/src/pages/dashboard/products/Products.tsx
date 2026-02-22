import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { deleteProductById, getProductsByPage, saveProduct } from "@/services/ProductService"
import type { Product } from "@/types/product"


export function Products() {
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
    "Oracle",
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
    "Gaming",
  ]

  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState<string>('')
  const [activeDialog, setActiveDialog] = useState<boolean>(false)
  const [productEdit, setProductEdit] = useState<Product | null>(null)
  const [formProduct, setFormProduct] = useState<Product>({
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

  async function loadProducts() {
    const response = await getProductsByPage(1)
    setProducts(response)
  }

  async function deleteProduct(id: number) {
    await deleteProductById(id)
    await loadProducts()
  }

  function handleFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormProduct({
      ...formProduct,
      [event.target.id]: event.target.value,
    })
  }

  async function submitForm() {
    if (formProduct.name === "" || formProduct.price! <= 0 || formProduct.stock! < 0) {
      alert("Please fill in all required fields.")
      return
    }
    await saveProduct(formProduct)
    setActiveDialog(false)
    setProductEdit(null)
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
    await loadProducts()
  }

  function openNewProduct() {
    setProductEdit(null)
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
    setActiveDialog(true)
  }

  function openEditProduct(product: Product) {
    setProductEdit(product)
    setFormProduct(product)
    setActiveDialog(true)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <>
      <div className="text-2xl font-bold font-serif text-neutral-600">Products</div>
      <div className="flex items-center gap-4">
        <div className="max-w-[300px]">
          <Input
            placeholder="Filter by name..."
            onChange={(event) => {
              setSearch(event.target.value)
            }}
          />
        </div>

        <Dialog open={activeDialog} onOpenChange={setActiveDialog}>
          <DialogTrigger asChild>
            <Button onClick={openNewProduct} className="bg-purple-600 hover:bg-purple-700 text-white">
              New Product
            </Button>
          </DialogTrigger>
        <DialogContent className="sm:max-w-[750px]">
          <DialogHeader>
            <DialogTitle>{productEdit ? "Edit Product" : "New Product"}</DialogTitle>
            <DialogDescription>
              Fill in the product details below
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <FieldSet>
              <FieldGroup>
                <div className="grid grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel htmlFor="name">Product Name</FieldLabel>
                    <Input
                      id="name"
                      placeholder="Ipad Pro"
                      required
                      onChange={handleFormChange}
                      value={formProduct.name}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="brand">Brand</FieldLabel>
                    <Select
                      value={formProduct.brand}
                      onValueChange={(value) =>
                        setFormProduct({ ...formProduct, brand: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {brands.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="category">Category</FieldLabel>
                    <Select
                      value={formProduct.category}
                      onValueChange={(value) =>
                        setFormProduct({ ...formProduct, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <Field>
                    <FieldLabel htmlFor="price">Price</FieldLabel>
                    <Input
                      type="number"
                      id="price"
                      placeholder="0.00"
                      required
                      onChange={handleFormChange}
                      value={formProduct.price}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="stock">Stock</FieldLabel>
                    <Input
                      type="number"
                      id="stock"
                      placeholder="0.00"
                      required
                      onChange={handleFormChange}
                      value={formProduct.stock}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>
                    <Input
                      id="imageUrl"
                      placeholder="https://example.com/image.jpg"
                      required
                      onChange={handleFormChange}
                      value={formProduct.imageUrl}
                    />
                  </Field>
                </div>
                <Field>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    placeholder="Product description"
                    id="description"
                    value={formProduct.description}
                    onChange={handleFormChange}
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
            <div className="flex gap-2">
              <Button type="button" onClick={submitForm}>
                Submit
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => setActiveDialog(false)}
              >
                Cancel
              </Button>
            </div>
          </FieldGroup>
        </DialogContent>
      </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead className="text-start">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products
            ?.filter((product) =>
              product.name?.toLowerCase().includes(search.toLowerCase())
            )
            .map((product) => (
              <TableRow key={product.productId}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price?.toFixed(2)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          navigator.clipboard.writeText(product.productId!.toString())
                        }
                      >
                        Copy ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          openEditProduct(product)
                        }}
                      >
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          deleteProduct(product.productId as number)
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  )
}