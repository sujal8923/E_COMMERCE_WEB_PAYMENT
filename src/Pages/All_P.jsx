import React from 'react'
import Layout from '../Component/Layout'
import Carousels from '../Component/Carousals'
import Filter from '../Component/Filter'
// import Cart from './Cart'
import { AllCard } from '../Component/AllCard'
import { All_Products } from '../Component/All_Products'
// import CarouselCard from '../Component/CarouselCard'


const All_P = () => {
  return (
    <div>
     <Layout>
      <Carousels/>
      <Filter/>
      <All_Products/>
     </Layout>
    </div>
  )
}

export default All_P
