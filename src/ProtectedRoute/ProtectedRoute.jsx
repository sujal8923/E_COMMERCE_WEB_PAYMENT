import React, { useContext } from 'react'
import myContext from '../Context/Mycontext'

function ProtectedRoute() {
    const context = useContext(myContext)
   const  {userId} = context
   console.log(userId);
  return (
    <div>
      
    </div>
  )
}

export default ProtectedRoute






// function ProtectedRoute() {
//     const context = useContext(myContext);
//     const { userId } = context;
//     console.log(userId);
//   const ProtectedRoutes = ({ children }) => {
//     if (userId) {
//       return children;
//     } else {
//       return <Navigate to={"/login"} />;
//     }
//   };
//   const protectedRoutesForAdmin = ({ children }) => {
//     if (userId.user.email === "sujalroy1822@gmail.com") {
//       return children;
//     } else {
//       return <Navigate to={"/login"} />;
//     }
//   };