import { configureStore } from "@reduxjs/toolkit";
import { cartData } from "./CartSlice";
export const store = configureStore({
    reducer:{        
     cart:cartData
    },
    devTools:true
})
