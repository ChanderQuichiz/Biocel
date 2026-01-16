'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
// import { StarIcon } from '@heroicons/react/20/solid'

import type { Product } from '@/types/product'
import { insertOrderDetail } from '@/services/OrderDetail'
 //function classNames(...classes:string[]) {
  //return classes.filter(Boolean).join(' ')
//}

export default function ProductQuickView({open, setOpen , product, setOrders}:{open:boolean, setOpen:React.Dispatch<React.SetStateAction<boolean>>, product:Product, setOrders?:React.Dispatch<React.SetStateAction<Product[]>>}) {

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in md:my-8 md:max-w-2xl md:px-4 data-closed:md:translate-y-0 data-closed:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => {setOpen(false); if (setOrders) setOrders(JSON.parse(localStorage.getItem('cart') || '[]'))}}
                className=" absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>

              <div className="m-2 grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <img
                  alt={product.name}
                  src={product.imageUrl}
                  className=" object-cover w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
                />
                <div className="sm:col-span-8 lg:col-span-7">
                    <h2 className="text-[22px] font-bold text-gray-900 sm:pr-12">{product.name}</h2>

                  <section aria-labelledby="information-heading" className="mt-2">

                    <h3 id="information-heading" className="sr-only">
                      Product information
                    </h3>
                    <p className="text-[22px] text-gray-900">${product.price}</p>
                    <p className='text-[16px] text-gray-600'>{product.description}</p>
                    {/* Reviews
                                        <div className="mt-6">
                      <h4 className="sr-only">Reviews</h4>
                      <div className="flex items-center">
                      {/*<div className="flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              aria-hidden="true"
                              className={classNames(
                                product.rating > rating ? 'text-gray-900' : 'text-gray-200',
                                'size-5 shrink-0',
                              )}
                            />
                          ))}
                        </div>}  
                        <p className="sr-only">2 out of 5 stars</p>
                        <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                          18 reviews
                        </a>
                      </div>
                    </div>
                    */}


                  </section>

                  <section aria-labelledby="options-heading">
                    <h3 id="options-heading" className="sr-only">
                      Product options
                    </h3>

                    <form>

                      <button
                      
                        type="button"
                        className="mt-6 cursor-pointer flex w-full items-center justify-center rounded-md border border-transparent  bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                      onClick={()=>insertOrderDetail(product)}
                      >
                        Add to bag
                      </button>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
