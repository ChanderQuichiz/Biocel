'use client'


import { PaymentModal } from './PaymentModal'
import { useEffect, useState } from 'react'
import type { OrderDetail, Product } from '@/types'
import { getAllProductById } from '@/services/ProductService'
import { deleteOrderDetail } from '@/services/OrderDetail'
import { calculateTotal } from '@/services/OrderDetail'
import ProductQuickView from '@/components/ProductQuickView'

export default function Checkout() {
  const [productSelected , setProductSelected] = useState<Product>({} as Product);
  const [open , setOpen] = useState<boolean>(false);
const [orders , setOrders] = useState<OrderDetail[]>(JSON.parse(localStorage.getItem('cart') || '[]'))
const [products , setProducts] = useState<Product[]>([])
async function fetchProducts(){
  setProducts(await getAllProductById(orders.map(order => order.productId as number)))
}
useEffect(()=>{
  // eslint-disable-next-line react-hooks/set-state-in-effect
  fetchProducts()

},[])
  return (


                <div className=" h-[80vh] grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-8  overflow-y-auto bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-medium text-gray-900">Shopping cart</h3>
                      <div className="ml-3 flex h-7 items-center">

                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {orders.length>0 && orders.map((order) => {
                            const product = products.find(p => p.productId === order.productId) ;
                            return (
                            <li key={order.productId} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img alt={product?.name} src={product?.imageUrl} className="size-full object-cover" />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a className='cursor-pointer' onClick={()=>{setOpen(true); setProductSelected(product!); }}>{product?.name}</a>
                                                                {open && <ProductQuickView open={open} setOpen={setOpen} product={productSelected} setOrders={setOrders}/>}
                                      
                                    </h3>
                                    <p className="ml-4">${product?.price}</p>
                                  </div>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Quantity {order.quantity}</p>

                                  <div className="flex">
                                    <button onClick={()=>{deleteOrderDetail(order.productId); setOrders(JSON.parse(localStorage.getItem('cart') || '[]'))}} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          )})}
                          {orders.length===0 && <p>Your cart is empty</p>}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>PEN {calculateTotal()}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                   <PaymentModal/>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                         
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>

  )
}
