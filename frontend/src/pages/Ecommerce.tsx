import { EcommerceBreadCrumb } from "@/components/EcommerceBreadCrumb";
import EcommerceHeader from "@/components/EcommerceHeader";
import { Outlet } from "react-router-dom";

export function Ecommerce() {
  
return(
  <>
    <div className="z-10 cursor-pointer fab pl-2 fixed bottom-2 right-1 max-w-[50px]">
    
    <img src="https://icones.pro/wp-content/uploads/2021/02/icone-du-logo-whatsapp-vert.png" alt="" />
</div>
  <EcommerceHeader/>
  <EcommerceBreadCrumb/>
  <Outlet/>
      <div>
      @Biocel {new Date().getFullYear()}
    </div>
  </>
)
}