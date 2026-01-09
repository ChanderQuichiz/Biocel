import type { product } from "../types/Product";
import { useState } from "react";
import ProductQuickView from "./ProductQuickView";
export function ProductList({products}:{products: product[]}) {
  const [open, setOpen] = useState<boolean>(false);
  const [productSelected , setProductSelected] = useState<product>({} as product);
    return(
             <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.productId} className="flex cursor-pointer flex-row group relative">
              <img
                alt={product.productName}
                src={product.image}
                className="aspect-square max-w-[150px] w-auto rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-40"
              />
              <div className="mt-4 flex justify-between">
                <div className="flex flex-col gap-4 text-[16px]">
                  <h3 className="text-sm text-gray-700 text-[20px]">
                    <a onClick={()=>{setOpen(true); setProductSelected(product)}} >

                          {open && <ProductQuickView open={open} setOpen={setOpen} product={productSelected}/>}

                      <span aria-hidden="true" className=" absolute inset-0" />
                      {product.productName}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 text-[20px]">${product.price.toFixed(2)}</p>

                </div>
              </div>
            </div>
          ))}
                       
        </div>
      </div>
     </div>
    )
}