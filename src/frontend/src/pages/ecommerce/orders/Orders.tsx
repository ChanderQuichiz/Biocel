import { useEffect, useState } from "react";
import type { Order } from "@/types/order";
import type { OrderDetail, User } from "@/types";
import { searchOrderDetails } from "@/services/OrderDetail";
import { searchOrder } from "@/services/OrderService";
export function Orders(){
    const [ordersDetails , setOrdersDetails] = useState<OrderDetail[] | null>(null);
    const [orders , setOrders] = useState<Order[] | null>(null);
    const [orderSelected , setOrderSelected] = useState<Order[] | null>(null);
    const account:User = JSON.parse(localStorage.getItem('account') || '{}');
   
 
    async function loadOrders() {
        const data = await searchOrder(`?user.userId=${account.userId}`);
        setOrders(data);
        if(data.length > 0){
        loadOrderSelected(data[0].orderId as number);

        }
    }
    async function loadOrderSelected(orderId:number) {
       const data = await searchOrder(`?user.userId=${account.userId}&orderId=${orderId}`);
        setOrderSelected(data);
        const details = await searchOrderDetails(`?user.userId=${account.userId}&order.orderId=${orderId}`);
        setOrdersDetails(details);
    }
    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadOrders();
        
    },[])

    return(
        <div className="bg-neutral-200 min-h-[80vh]">
       {orders?.length === 0 && <div className="flex flex-row justify-between text-3xl py-4 w-[80%] m-auto text-neutral-400 font-serif font-bold bg-neutral-200 text-center" > No order found   </div>}
       {orders && orders?.length>0 && <div className="flex flex-row justify-between text-3xl py-4 w-[80%] m-auto text-neutral-400 font-serif font-bold bg-neutral-200"><div>Orders</div> <select name="" id="" className="border-2 border-white"  onChange={(event)=>{
                    loadOrderSelected(Number(event.target.value));
                }}>
            {orders?.map(order=>(
                <option key={order.orderId} value={order.orderId}>NUM-{order.orderId}</option>
            ))}
            </select> </div>} 

            {orderSelected && orderSelected.length > 0 && (
        <div className="bg-white m-auto w-[80%] flex flex-col gap-4 p-4 border-2 border-neutral-300">
            <div className="grid grid-cols-4 border-b-2 border-neutral-300 pb-4
             ">
                <div className="flex flex-col">
                    <div className="font-semibold">Creation Date:</div>
                    <div>{orderSelected[0].createdAt}</div>
                </div>
                 <div className="flex flex-col">
                    <div className="font-semibold">Order placed:</div>
                    <div>{orderSelected[0].estimatedDelivery}</div>
                </div>
                 <div className="flex flex-col">
                    <div className="font-semibold">Total:</div>
                    <div>${orderSelected[0].total}</div>
                </div>
                          <div className="flex flex-col">
                    <div className="font-semibold">Status:</div>
                    <div>{orderSelected[0].status}</div>
                </div>
            </div>
            {ordersDetails?.map(detail=>
               (
                    <div key={detail.orderDetailId} className="flex flex-row py-2 ">
        
            
                                     <div></div>
                                          <div className=" size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img  src={detail.product.imageUrl} className="size-full object-cover" />
                                          </div>
            
                                          <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                              <div className="flex justify-between text-base font-medium text-gray-900">
                                                
                                                     <div className="">{detail.product.name}</div>
                                               
                                                  
                                                <p className="ml-4">${detail.subtotal}</p>
                                                
                                              </div>
                                            
                                            </div>
                                           
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                            
                                              <p className="text-gray-500">Quantity {detail.quantity}</p>
            
                                           
                                            </div>
                                          </div>
                                        
                                      
        </div>
                )
                )}
        
        </div>)}
    </div>
    )
}