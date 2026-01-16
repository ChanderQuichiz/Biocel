import { DataTableDemo } from "./DataTableDemo";
import { ProductDialog } from "./ProductDialog";
import type { Product } from "@/types/product";
import React from "react";

export function Products(){
      const [productEdit, setProductEdit] = React.useState<Product | null>(null);
      const [activeDialog, setActiveDialog] = React.useState<boolean>(false);
      const [data, setData] = React.useState<Product[]>([
        {
          productId: 2,
          name: "Smartphone X",
          category: "Smartphones",
          brand: "TechBrand",
          description: "A high-end smartphone with advanced features.",
          imageUrl: "https://example.com/images/smartphone-x.jpg",
          price: 999.99,
          stock: 50,
          updatedAt: "2024-01-15T10:00:00Z",
        },
        {
          productId: 3,
          name: "Laptop Pro",
          category: "Laptops",
          brand: "ComputeCorp",
          description: "A powerful laptop for professionals.",
          imageUrl: "https://example.com/images/laptop-pro.jpg",
          price: 1499.99,
          stock: 30,
          updatedAt: "2024-01-10T12:30:00Z",
        },
      ])
    return(
        <>
        <div>Welcome maintenance products</div>
        <ProductDialog productEdit={productEdit} activeDialog={activeDialog} setActiveDialog={setActiveDialog} setData={setData}/>
        <DataTableDemo setProductEdit={setProductEdit} activeDialog={activeDialog} setActiveDialog={setActiveDialog} data={data} setData={setData}/>
        </>
    )
}