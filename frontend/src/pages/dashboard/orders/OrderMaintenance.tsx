import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import type { Order } from "@/types/order"
import { useEffect, useState } from "react"
import { saveOrder, searchOrder } from "@/services/OrderService"


export function OrderMaintenance() {
    const [orders, setOrders] = useState<Order[] | null>(null);
    const [search , setSearch] = useState<string>('');
   async function loadOrders(filters:string='') {
    const response = await searchOrder(filters);
    setOrders(response);
   }
   useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadOrders(search);
   } ,[search])

  return (
    <>
    <div className="text-2xl font-bold font-serif text-neutral-600">Orders</div>
    <div className="max-w-[300px]">
        <Input placeholder="Filter by order number..." className="" 
        onChange={(event)=>{
            if(event.target.value.trim()!==''){
                setSearch(`?orderId=`+event.target.value);

                return;
            }
                            setSearch('');

        }}
        /></div>

   
    
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>N. Order</TableHead>
            <TableHead>Delivery address</TableHead>
            <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-start">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>


        {orders?.map((order) => (
          <TableRow key={order.orderId}>
          <TableCell className="font-medium">NO-{order.orderId}</TableCell>
            <TableCell>{order.address.city}, {order.address.district} {order.address.address}</TableCell>
            <TableCell>${order.total}</TableCell>
            <TableCell>
                
    <Select defaultValue={order.status} onValueChange={async(value:("pending" | "preparing" | "out_for_delivery" | "delivered" | "postponed"))=>{
        await saveOrder({...order , status:value})
        loadOrders(search);
    }} >
        <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
        <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="pending">pending</SelectItem>
            <SelectItem value="preparing">preparing</SelectItem>
            <SelectItem value="out_for_delivery">out_for_delivery</SelectItem>
            <SelectItem value="delivered">delivered</SelectItem>
            <SelectItem value="postponed">postponed</SelectItem>
        </SelectGroup>
        </SelectContent>
    </Select>

</TableCell>
 <TableCell className="text-start">
              <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">View details</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          {/*orderSelected && orderSelected.length > 0 && (
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
        
        </div>)*/}
        </DialogContent>
      </form>
    </Dialog>
          </TableCell>
</TableRow>

        ))}
      
      </TableBody>
    </Table>
    </>
  )
}
