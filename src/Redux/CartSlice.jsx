import { createSlice } from "@reduxjs/toolkit";
import Cart from "../Pages/Cart";
// import { toast } from "react-toastify";


 const initialState = JSON.parse(localStorage.getItem('cart')) ?? []
// const initialState = []
const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart(state,action){
            state.push(action.payload)
        },
        deleteFromCart(state,action){
            return state.filter((item)=> item.id != action.payload.id)
        },
        clearState(state){
            return []
        }
    }
})
 export  const {addToCart,deleteFromCart,clearState} = cartSlice.actions
 export const  cartData =  cartSlice.reducer