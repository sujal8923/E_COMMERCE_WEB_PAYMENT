import React, { useEffect, useState } from "react";
import MyContext from "./Mycontext";
import {
  addDoc,
  collection,
  deleteDoc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { fireDB } from "../Firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

function MyState(props) {
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);
  const [userD,setUserD] = useState("")
  const navi = useNavigate();
  const toggleButton = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [products, setProducts] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // addProduct section
  const addProduct = async (e) => {
    e.preventDefault();
    const { title, price, imageUrl, category, description } = products;

    if (
      title === "" ||
      price === "" ||
      imageUrl === "" ||
      category === "" ||
      description === ""
    ) {
      return toast.error("All fields are mandatory", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    const prodRef = collection(fireDB, "products");
    setLoading(true);

    try {
      await addDoc(prodRef, {
        title,
        price,
        imageUrl,
        category,
        description,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      toast.success("Added Product successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
      Getproduct();
      setTimeout(() => {
        navi("/dashboard");
      }, 2000);
      setProducts({
        title: "",
        price: "",
        imageUrl: "",
        category: "",
        description: "",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  // Getproduct - fetch real-time products
  const [product, setProduct] = useState([]);

  const Getproduct = () => {
    setLoading(true);

    // Create query to fetch products in order of the "time" field
    const q = query(collection(fireDB, "products"), orderBy("time"));
    const data = onSnapshot(q, (QuerySnapshot) => {
      let productArray = [];
      QuerySnapshot.forEach((doc) => {
        productArray.push({ ...doc.data(), id :doc.id });
      });
      setProduct(productArray);
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => data;
  };

  useEffect(() => {
    Getproduct();
  }, []); // Empty array ensures this runs only once when the component mounts

  console.log(product); // Log products to check real-time updates
  const editHandel = (item) => {
    setProducts(item);
  };
  const updateProducts = async() => {
    setLoading(true);
    try {
      if(!products.id){
        alert("product id missing")
        return;
      }
     await setDoc(doc(fireDB, "products", products.id),products);
     setTimeout(() => {
       toast.success("Product updated successfully", {
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
       });
     }, 800);
      Getproduct();
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.error("Error updating product:", error)
    }
    finally{
      setLoading(false)
    }
  };
  const deleteProduct = async(item)=>{
    setLoading(true)

   try {
    await deleteDoc(doc(fireDB,"products",item.id))
    setTimeout(() => {
      toast.success("Product updated successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }, 800);
    Getproduct()
    setLoading(false)
   } catch (error) {
    setLoading(false)
   }
  }
  let [order,setOrder] = useState()
  const getOrder = async()=>{
setLoading(true)
try{
  const result = await getDocs(collection(fireDB,"orders"))
  const orderArr = []
  result.forEach((doc)=>{
    orderArr.push(doc.data())
  })
  setOrder(orderArr)
  console.log(orderArr);
  
setLoading(false)

}catch{
setLoading(false)

}

  }
  let [User,setUser] = useState()
  const getUser = async()=>{
setLoading(true)
try{
  const result = await getDocs(collection(fireDB,"users"))
  const userArr = []
  result.forEach((doc)=>{
    userArr.push(doc.data())
  })
  setUser(userArr)
  // console.log(orderArr);
  
setLoading(false)

}catch{
setLoading(false)

}

  }
  useEffect(()=>{
    Getproduct()
    getOrder()
    getUser()

  },[])
  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleButton,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        updateProducts,
        editHandel,
        deleteProduct,
       userD,
       setUserD,
       order,
       setOrder,
       getOrder,
       User,
       searchkey,
       setSearchkey,
       filterType,
       setFilterType,
       filterPrice,
       setFilterPrice
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default MyState;
