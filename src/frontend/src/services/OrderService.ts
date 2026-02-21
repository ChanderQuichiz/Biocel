import type { Order } from "@/types";

export async function searchOrder(filters:string=''){
    const response = await fetch(`http://localhost:8020/orders/search${filters}`)
    const data = await response.json()
    return data.content as Order[];
}
export async function saveOrder(order:Order){
    const response = await fetch(`http://localhost:8020/orders/save`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(order)
    })
    const data = await response.json()
    return data as Order;
}