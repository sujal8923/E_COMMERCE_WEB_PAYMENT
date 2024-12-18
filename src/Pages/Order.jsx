import React, { useContext, useEffect } from 'react'
import myContext from '../Context/Mycontext'
import Layout from '../Component/Layout'
import Loader from '../Loader/Loader'
import { useSelector } from 'react-redux'

const Order = () => {
  let context = useContext(myContext)
  let { mode, setMode, order, loading, userD,getOrder } = context
  console.log(order);
  useEffect(()=>{
    getOrder()

  },[order])
  return (
    <div>
      <Layout>
        {/* {loading && <Loader />} */}
        {
          order?.length > 0 ? 
          (
            <div className="h-full pt-10">
              {
                // Filter the orders based on userId
                order.filter(orderObj => orderObj?.userId === userD?.uid).map((orderObj, index) => {
                  return (
                    <div key={index} className="mx-auto max-w-9xl   px-6 xl:flex gap-56">
                      {
                        // Loop through cartItem in each order
                        orderObj.cartItem.map((item, idx) => {
                          return (
                            <div key={idx} className="rounded-lg md:w-2/3">
                              <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '' }}>
                                <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                  <div className="mt-5 sm:mt-0">
                                    <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                                    <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</p>
                                    <div className='flex  gap-7'>
                                    <p className="mt-1 text-xs text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.price}</p>
                                  <img src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/order-placed-purchased-icon.svg" className='w-10 mt-1' alt="" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                })
              }
            </div>
          )
          :
          (
            <h2 className="text-center text-2xl text-white">Not Order</h2>
          )
        }
      </Layout>
    </div>
  )
}

export default Order
