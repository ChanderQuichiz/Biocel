import ProductQuickView from "@/components/ProductQuickView";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { PaginationDemo } from "../home/PaginationDemo";
import type { Product } from "@/types/product";
import React from "react";
import { searchProductsByText } from "@/services/ProductService";

export default function Search() {
    const params = useParams();
    const [results , setResults] = useState<Product[]>([]);
    async function fetchSearch(){
        setResults(await searchProductsByText(params.text as string))
    }
    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchSearch();
    },[params.text])
  const [open, setOpen] = React.useState<boolean>(false);
  const [resultSelected , setResultSelected] = React.useState<Product>({} as Product);
    return(
             <div className="bg-white">
      <div className="bg-gray-100  mx-auto max-w-2xl px-4 py-4 sm:px-6  lg:max-w-7xl lg:px-8">
        <h2 className="text-black font-medium text-4xl font-semibold ">Results</h2>

        <div className=" mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {results.map((result) => (
            <div key={result.productId} className="sm:grid sm:place-content-center sm:text-center text-start bg-white  rounded-3xl px-4 flex cursor-pointer flex-row sm:flex-col group relative">
              <img
                alt={result.name}
                src={result.imageUrl}
                className=" aspect-square max-w-[150px] w-auto rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-40"
              />
              <div className="mt-4 flex justify-between">
                <div className="flex flex-col gap-4 text-[16px]">
                  <h3 className="text-sm justify-between text-gray-700 text-[20px]">
                    <a onClick={()=>{setOpen(true); setResultSelected(result)}} >

                          {open && <ProductQuickView open={open} setOpen={setOpen} product={resultSelected}/>}

                      <span aria-hidden="true" className=" absolute inset-0" />
                      {result.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 text-[20px]">${result.price!.toFixed(2)}</p>

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