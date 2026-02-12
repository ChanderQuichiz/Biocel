"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
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

  const [productEdit, setProductEdit] = React.useState<Product | null>(null)
  const [activeDialog, setActiveDialog] = React.useState<boolean>(false)
  const [data, setData] = React.useState<Product[]>([])
  const [page, setPage] = React.useState<number>(1)
  const [formProduct, setFormProduct] = React.useState<Product>({
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

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns: ColumnDef<Product>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "brand",
      header: "Brand",
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => {
        const price = row.getValue<number>("price")
        return <div className="text-right font-medium">${price.toFixed(2)}</div>
      },
    },
    {
      accessorKey: "stock",
      header: () => <div className="text-right">Stock</div>,
      cell: ({ row }) => (
        <div className="text-right">{row.getValue("stock")}</div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
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
                  setActiveDialog(true)
                  setProductEdit(product)
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 "
                onClick={() => {
                  deleteProduct(product.productId as number)
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  async function fetchProducts() {
    const products = await getProductsByPage(page)
    setData(products)
  }

  async function deleteProduct(id: number) {
    await deleteProductById(id)
    await fetchProducts()
  }

  function writerFormProduct(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormProduct({
      ...formProduct,
      [event.target.id]: event.target.value,
    })
  }

  async function sendForm() {
    if (formProduct.name === "" || formProduct.price! <= 0 || formProduct.stock! < 0) {
      alert("Please fill in all required fields.")
      return
    }

    await saveProduct(formProduct)
    setData(await getProductsByPage(1))
  }

  React.useEffect(() => {
    fetchProducts()
  }, [page])

  React.useEffect(() => {
    if (productEdit) {
      setFormProduct({
        ...productEdit,
        updatedAt: new Date().toISOString(),
      })
    }
  }, [productEdit])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="w-full">
      <div className="font-sans text-2xl font-bold text-gray-400">Welcome maintenance products</div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
        <Dialog
          open={activeDialog}
          onOpenChange={(open) => {
            setActiveDialog(open)
            if (!open) {
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
            }
          }}
        >
          <DialogTrigger asChild>
            <button className="rounded-[5px] m-10 w-[20%] py-2 bg-purple-600 text-white cursor-pointer ">
              New Product
            </button>
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
                      <FieldLabel htmlFor="name">Product Name</FieldLabel>
                      <Input
                        id="name"
                        placeholder="Ipad Pro"
                        required
                        onChange={writerFormProduct}
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
                          <SelectValue placeholder="Apple" />
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
                          <SelectValue placeholder="tablets" />
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
                        onChange={writerFormProduct}
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
                        onChange={writerFormProduct}
                        value={formProduct.stock}
                      />
                    </Field>
                    <Field>
                      <div className="grid w-full max-w-sm items-center gap-3">
                        <FieldLabel htmlFor="imageUrl">Picture</FieldLabel>
                        <Input
                          id="imageUrl"
                          placeholder="https://example.com/image.jpg"
                          required
                          onChange={writerFormProduct}
                          value={formProduct.imageUrl}
                        />
                      </div>
                    </Field>
                  </div>

                  <Field>
                    <div className="grid w-full gap-3">
                      <FieldLabel htmlFor="description">Description</FieldLabel>
                      <Textarea
                        placeholder="Type your message here."
                        id="description"
                        value={formProduct.description}
                        onChange={writerFormProduct}
                      />
                    </div>
                  </Field>
                </FieldGroup>
              </FieldSet>

              <Field orientation="horizontal">
                <Button type="button" onClick={sendForm}>
                  Submit
                </Button>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </Field>
            </FieldGroup>
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  not found results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}