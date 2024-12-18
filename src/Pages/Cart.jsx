import React, { useContext, useEffect, useState } from "react";

import Layout from "../Component/Layout";
import myContext from "../Context/Mycontext";
import Modal from "../Component/Modal";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart } from "../Redux/CartSlice";
import { toast } from "react-toastify";
import { fireDB } from "../Firebase/FirebaseConfig";
import { addDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Cart() {
  const context = useContext(myContext);
  const { mode, userD } = context;
  let navi = useNavigate()

  console.log(userD);
  // console.log(userId);
  const cartItem = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("Cart delete successfull", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  let [totalAmt, setTotalAmt] = useState(0);
  useEffect(() => {
    let temp = 0;
    cartItem.forEach((element) => {
      temp = temp + parseInt(element.price, 10);
      console.log(temp);
    });
    setTotalAmt(temp);
  }, [cartItem]);
  let grandTotal = totalAmt + 20;
  // Payment Intrigation
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const buyNow = async () => {
    if (name === "" || address === "" || pincode === "" || phoneNumber === "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        theme: "colored",
      });
    }
  
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
  
    // Razorpay payment options
    var options = {
      key: "rzp_test_fbVzPa4hmFFbtz",
      key_secret: "XTFQxrArOc78ZG3h3txHhF5D", // Use your actual Razorpay key
      amount: parseInt(grandTotal * 100), // Amount in paise
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "Sara",
      description: "For testing purpose",
      handler: function (response) {
        console.log(response);
        const paymentId = response.razorpay_payment_id;

        if (paymentId) {
          toast.success("Payment Successful");
          setTimeout(() => {
            navi('/order')
          }, 2000);
          const orderInfo = {
            cartItem,
            addressInfo,
            date: new Date().toLocaleString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }),
            email: userD.email,
            userId: userD.uid,
            paymentId,
          };
  
          try {
            const result = collection(fireDB, "orders");
             addDoc(result, orderInfo);
          } catch (error) {
            console.error("Error storing order in Firebase:", error);
          }
        } else {
          toast.error("Payment failed. Please try again.");
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
  
    // Ensure Razorpay SDK is loaded
    if (window.Razorpay) {
      const pay = new window.Razorpay(options);
      pay.open();
    } else {
      console.error("Razorpay SDK is not loaded.");
      toast.error("Razorpay SDK failed to load.");
    }
  };
  

  return (
    <Layout className=''>
      {
        <div
          className="h-screen bg-gray-100 pt-5 mb-[1100px] "
          style={{
            backgroundColor: mode === "dark" ? "#282c34" : "",
            color: mode === "dark" ? "white" : "",
          }}
        >
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
            <div className="rounded-lg md:w-2/3 ">
              {cartItem.map((cart, index) => {
                return (
                  <div
                    className="justify-between mb-6  border   bg-white p-6  sm:flex  sm:justify-start"
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <img
                      src={cart.imageUrl}
                      alt="product-image"
                      className="w-full  sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2
                          className="text-lg font-bold text-gray-900"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {cart.title}
                        </h2>
                        <h2
                          className="text-sm  text-gray-900"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {cart.description}
                        </h2>
                        <p
                          className="mt-1 text-xs font-semibold text-gray-700"
                          style={{ color: mode === "dark" ? "white" : "" }}
                        >
                          {" "}
                          ₹{cart.price}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                          onClick={() => deleteCart(cart)}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3 "
              style={{
                backgroundColor: mode === "dark" ? "rgb(32 33 34)" : "",
                color: mode === "dark" ? "white" : "",
              }}
            >
              <div className="mb-2 flex justify-between">
                <p
                  className="text-gray-700"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Subtotal
                </p>
                <p
                  className="text-gray-700"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  ₹{totalAmt}
                </p>
              </div>
              <div className="flex justify-between">
                <p
                  className="text-gray-700"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Shipping
                </p>
                <p
                  className="text-gray-700"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  ₹20
                </p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between mb-3">
                <p
                  className="text-lg font-bold"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Total
                </p>
                <div className>
                  <p
                    className="mb-1 text-lg font-bold"
                    style={{ color: mode === "dark" ? "white" : "" }}
                  >
                    ₹{grandTotal}
                  </p>
                </div>
              </div>
              {/* <Modal  /> */}
              <Modal
                name={name}
                address={address}
                pincode={pincode}
                phoneNumber={phoneNumber}
                setName={setName}
                setAddress={setAddress}
                setPincode={setPincode}
                setPhoneNumber={setPhoneNumber}
                buyNow={buyNow}
              />{" "}
            </div>
          </div>
        </div>
      }
      
    </Layout>
  );
}

export default Cart;
