import React, { useContext } from 'react'
import Layout from '../Component/Layout'
import myContext from '../Context/Mycontext'
import Hero from '../Component/Hero'
import Filter from '../Component/Filter'
import { AllCard } from '../Component/AllCard'
import Tracking from '../Component/Tracking'
import Customer from '../Component/Customer'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  let navi = useNavigate()
  let navigate = ()=>{
    navi('/allproduct')
  }
    
    
  return (
    <div>
      <Layout >
       <Hero/>
       <Filter/>
       <AllCard/>
       <button className='mx-auto text-1xl rounded-md bg-gray-300 text-black flex  justify-center p-2' onClick={navigate}>See more</button>
       <Tracking/>
      <Customer/>
      </Layout>
    </div>
  )
}

export default Home
