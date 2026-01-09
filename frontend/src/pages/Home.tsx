import { CarouselDemo } from "@/components/CarouselDemo";
import { ProductList } from "../components/ProductsList";
import type { product } from "../types/Product";
import { useState } from "react";

export function Home(){
  const [products] = useState<product[]> ( [
  {
    productId: '1',
    productName: 'Galaxy S24 Ultra 5g',
    brand: {
      brandId: 1,
      brandName: '', // Add the brand name here
      status: 'active'
    },
    category: {
      categoryId: 1,
      categoryName: '', // Add the category name here
      description: '', // Add the category description here
      status: 'active'
    },
    description: 'This is a basic t-shirt',
    price: 35,
    stock: 10,
    status: 'active',
    image: 'https://media.falabella.com.pe/falabellaPE/18673460_1/width=480,height=480,quality=70,format=webp,fit=pad'
  },
  {
    productId: '2',
    productName: 'Basic Tee',
    brand: {
      brandId: 1,
      brandName: '', // Add the brand name here
      status: 'active'
    },
    category: {
      categoryId: 1,
      categoryName: '', // Add the category name here
      description: '', // Add the category description here
      status: 'active'
    },
    description: 'This is a basic t-shirt',
    price: 35,
    stock: 10,
    status: 'active',
    image: 'https://media.falabella.com.pe/falabellaPE/20865075_1/width=480,height=480,quality=70,format=webp,fit=pad'
  },
  {
    productId: '3',
    productName: 'Basic Tee',
    brand: {
      brandId: 1,
      brandName: '', // Add the brand name here
      status: 'active'
    },
    category: {
      categoryId: 1,
      categoryName: '', // Add the category name here
      description: '', // Add the category description here
      status: 'active'
    },
    description: 'This is a basic t-shirt',
    price: 35,
    stock: 10,
    status: 'active',
    image: 'https://media.falabella.com.pe/falabellaPE/147500263_01/width=480,height=480,quality=70,format=webp,fit=pad'
  },
  {
    productId: '4',
    productName: 'Basic Tee',
    brand: {
      brandId: 1,
      brandName: '', // Add the brand name here
      status: 'active'
    },
    category: {
      categoryId: 1,
      categoryName: '', // Add the category name here
      description: '', // Add the category description here
      status: 'active'
    },
    description: 'This is a basic t-shirt',
    price: 35,
    stock: 10,
    status: 'active',
    image: 'https://media.falabella.com.pe/falabellaPE/20897639_01/width=480,height=480,quality=70,format=webp,fit=pad'
  }
]);
  return(
    <>
    <div className="flex flex-row">
           <CarouselDemo/>
          <CarouselDemo/>
    </div>


     <div className="flex flex-row justify-center gap-x-20 text-center mt-4 mb-[-56px] z-10">

      <div className="flex flex-col">
        <img src="https://static.hendel.com/media/catalog/product/cache/ab24d029cc9f966c2786182ee79c35cb/5/4/54976_0_min.jpg" alt="" className="cursor-pointer h-[100px] rounded-full border-[1px] border-gray-200"/>
        <p>Celulares</p>
      </div>
      <div className="flex flex-col">
      <img src="https://www.peru-smart.com/wp-content/uploads/2024/06/TABL011GRIS-64GB.jpg" alt="" className="cursor-pointer h-[100px] rounded-full border-[1px] border-gray-200" />
        <p>Tablets</p>
      </div>
       <div className="flex flex-col">
          <img src="https://plazavea.vteximg.com.br/arquivos/ids/29787706-418-418/null.jpg" alt="" className="cursor-pointer h-[100px] rounded-full border-[1px] border-gray-200" />
        <p>Auriculares</p>
      </div>
<div className="flex flex-col">
          <img src="https://hammeronline.in/cdn/shop/files/Hammerfit.webp?v=1694859121" alt="" className="cursor-pointer h-[100px] rounded-full border-[1px] border-gray-200" />
        <p>Smart whatch</p>
      </div>
     </div>
    <ProductList products={products}/>
    </>
    )
}