import { CarouselDemo } from "@/pages/ecommerce/home/CarouselDemo";
import { ProductList } from './ProductsList'
import { useParams } from "react-router-dom";

export function Home(){
  const params = useParams();
  const page = Number((params as { page?: string }).page) || 1;
  return(
    <>
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-2">
           <CarouselDemo/>
                <div className="grid gap-4 grid-cols-2 justify-center  text-center ">

<div className="hover:bg-pink-600 text-white z-10 group relative">
    <p className="hidden group-hover:block absolute inset-0 top-[40%] font-light text-3xl ">Smartphones</p>
        <img src="https://static.hendel.com/media/catalog/product/cache/ab24d029cc9f966c2786182ee79c35cb/5/4/54976_0_min.jpg" alt="" className="cursor-pointer h-[150px] w-full border-[1px] border-pink-600 text-white group-hover:opacity-5 border-white"/>
</div>
<div className="hover:bg-pink-600 text-white z-10 group relative">
    <p className="hidden group-hover:block absolute inset-0 top-[40%] font-light text-3xl ">Tablets</p>
      <img src="https://www.peru-smart.com/wp-content/uploads/2024/06/TABL011GRIS-64GB.jpg" alt="" className="cursor-pointer h-[150px] w-full border-[1px] border-pink-600 text-white group-hover:opacity-5 border-white " />

</div>
<div className="hover:bg-pink-600 text-white z-10 group relative
">
  <p className="hidden group-hover:block absolute inset-0 top-[40%] font-light text-3xl ">Audiculares</p>
          <img src="https://plazavea.vteximg.com.br/arquivos/ids/29787706-418-418/null.jpg" alt="" className=" cursor-pointer h-[150px] w-full border-[1px] border-pink-600 text-white group-hover:opacity-5 border-white "/>

</div>
<div className="hover:bg-pink-600 text-white z-10 group relative">
    <p className="hidden group-hover:block absolute inset-0 top-[40%] font-light text-3xl ">Smartwatchs</p>
            <img src="https://hammeronline.in/cdn/shop/files/Hammerfit.webp?v=1694859121" alt="" className="cursor-pointer h-[150px] w-full border-[1px] border-pink-600 text-white group-hover:opacity-5 border-white " />
    <p className="  "></p>
</div>

           </div>

    </div>
               <ProductList page={page}/>

    </>
    )
}
