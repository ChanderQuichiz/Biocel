import type { OrderDetail, Product } from "@/types";

export function insertOrderDetail(product: Product){
    const orderDetail: OrderDetail = {
        productId: product.productId as number,
        quantity: 1,
        price: product.price,
        subtotal: product.price,
    };
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const exists = cart.find((item : OrderDetail) => item.productId === orderDetail.productId);
    if(exists){
    exists.quantity += orderDetail.quantity;
    exists.subtotal = exists.quantity * exists.price;
    }
    else cart.push(orderDetail);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('cart:', cart);
}
export function deleteOrderDetail(productId: Product['productId']){
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const order = cart.find((item : OrderDetail) => item.productId === productId);
    if (order.quantity > 1) {
        order.quantity --;
        order.subtotal = order.quantity * order.price;
        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
    const updatedCart = cart.filter((item : OrderDetail) => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
}
export function calculateTotal(){
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.reduce((total:number, item:OrderDetail)=>total+(item.subtotal||0), 0);
}
