import { CarouselDemo } from "@/pages/ecommerce/home/CarouselDemo";
import { ProductList } from './ProductsList'
import { useParams } from "react-router-dom";

export function Home(){
  const params = useParams();
  const page = Number((params as { page?: string }).page) || 1;
  return(
    <>
    <div className="grid sm:grid-cols-2 grid-cols-1">
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
               <ProductList page={page}/>

    </>
    )
}
