import React, { useContext } from 'react'
import './index.css'
import  Home from './Pages/Home'
import  Order from './Pages/Order'
import  Cart from './Pages/Cart'
// import    Dashboard from './Pages/Dashboards'
// import    NoPage from './Pages/NoPages'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import NoPages from './Pages/NoPages'
import MyState from './Context/MyState'
import All_P from './Pages/All_P'
import Login from './Pages/Registration/Login'
import SignUp from './Pages/Registration/SignUp'
import ProductInfo from './Pages/ProductInfo/ProductInfo'
import Dashboard from './Pages/Admin/Dashboards'
import AddProduct from './Pages/Admin/AddProduct'
import UpdateProduct from './Pages/Admin/UpdateProduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import myContext from './Context/Mycontext'
import 'flowbite';

// import ProtectedRoute from './ProtectedRoute/ProtectedRoute'
function App() {

  return (
    <div>
      <MyState>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/order" element={ 
         <ProtectedRoutes>
          <Order/>
         </ProtectedRoutes>
          } />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/dashboard" element={
          <ProtectedRoutesForAdmin>
            <Dashboard/>
          </ProtectedRoutesForAdmin>
          } />
        <Route path="/*" element={<NoPages/>} />
        <Route path="/allproduct" element={<All_P/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/signUp' element={<SignUp/>} />
        <Route  path='/productinfo/:id' element={<ProductInfo/>}/>
        <Route  path='/addproduct' element={
          <ProtectedRoutesForAdmin>
             <AddProduct/>
          </ProtectedRoutesForAdmin>
          }/>
        <Route  path='/updateproduct' element={ 
      <ProtectedRoutesForAdmin>
            <UpdateProduct/>
      </ProtectedRoutesForAdmin>
          }/>
      </Routes>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
      </MyState>
    </div>
  )
}

export default App

// const { userId } = useContext(myContext) || {};  // Default to empty object if context is not available
// console.log(userId);
export const ProtectedRoutes = ({ children }) => {
  const { userD } = useContext(myContext) || {};  // Default to empty object if context is not available
// console.log(userId);
  if (userD) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
export const ProtectedRoutesForAdmin = ({ children }) => {
  const { userD } = useContext(myContext) || {};  // Default to empty object if context is not available
// console.log(userId);
  if (userD.email === "sujalroy1822@gmail.com") {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
};