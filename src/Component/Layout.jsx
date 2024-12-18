// import React, { Children } from 'react'
import { useContext } from 'react'
import Footer from './Footer'
import   Navbar from './Navbar'
import myContext from '../Context/Mycontext'

const Layout = ({children}) => {
    const context = useContext(myContext)
    const {mode} = context
  return (
    <div className={mode === 'light'? "text-black" : "text-white"}>
        <Navbar/>
        <div>
              {children}
        </div>
        <Footer/>

    </div>
  )
}

export default Layout
