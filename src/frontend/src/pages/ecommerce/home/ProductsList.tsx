import type { Product } from "@/types/product";
import * as React from "react";
import ProductQuickView from "../../../components/ProductQuickView";
import { PaginationDemo } from './PaginationDemo';
import { getProductsByPage } from "@/services/ProductService";
export function ProductList({page}: {page: number}) {
  const [products, setProducts] = React.useState<Product[]>([]);
  async function fetchProducts(){
    const response = await getProductsByPage(page);
  setProducts(response);
  }
  React.useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  },[])
  const [open, setOpen] = React.useState<boolean>(false);
  const [productSelected , setProductSelected] = React.useState<Product>({} as Product);
    return(
             <div className="bg-white">
      <div className="bg-gray-100  mx-auto max-w-2xl px-4 py-4 sm:px-6  lg:max-w-7xl lg:px-8">
        <h2 className="text-neutral-600 text-center font-serif p-4  text-4xl font-semibold ">Products</h2>

        <div className=" mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.productId} className="sm:grid sm:place-content-center sm:text-center text-start bg-white  rounded-3xl px-4 flex cursor-pointer flex-row sm:flex-col group relative">
              <img
                alt={product.name}
                src={product.imageUrl}
                className=" aspect-square max-w-[150px] w-auto rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-40"
              />
              <div className="mt-4 flex justify-between">
                <div className="flex flex-col gap-4 text-[16px]">
                  <h3 className="text-sm justify-between text-gray-700 text-[20px]">
                    <a onClick={()=>{setOpen(true); setProductSelected(product)}} >

                          {open && <ProductQuickView open={open} setOpen={setOpen} product={productSelected}/>}

                      <span aria-hidden="true" className=" absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 text-[20px]">${product.price!.toFixed(2)}</p>

                </div>
              </div>
            </div>
          ))}
                       
        </div>
      </div>
      <PaginationDemo/>
     </div>
    )
}