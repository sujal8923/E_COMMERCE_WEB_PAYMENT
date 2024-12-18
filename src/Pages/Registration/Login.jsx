import { Link, useNavigate } from "react-router-dom";
import myContext from "../../Context/Mycontext";
import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../Firebase/FirebaseConfig";
import Loader from "../../Loader/Loader";
import { useSelector } from "react-redux";

function Login() {
  let context = useContext(myContext);
  const { loading, setLoading, userD, setUserD } = context;
  
  let navi = useNavigate();
  let selector = useSelector((state) => state.cart);
  console.log(selector); // If needed, use the cart state here
  
  const [userdata, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    setUserData({
      ...userdata,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Validation check
    if (
      userdata.name === "" ||
      userdata.email === "" ||
      userdata.password === ""
    ) {
      setLoading(false);
      return toast.warn("All fields are mandatory", {
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

    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userdata.email,
        userdata.password
      );
      setUserD(users.user); // Store user object correctly
      toast.success("Sign In successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setTimeout(() => {
        navi('/');
      }, 2000);

      // Reset userdata after successful sign-up
      setUserData({ name: "", email: "", password: "" });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false); // Stop loading state
      toast.error(error.message || "An error occurred during sign-in", {
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

  return (
    <div className="flex justify-center items-center h-screen">
      {loading && <Loader />}
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <div className="">
          <h1 className="text-center text-white text-xl mb-4 font-bold">Login</h1>
        </div>
        <form action="" onSubmit={handelSubmmit}>
          <div>
            <input
              type="text"
              name="name"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Full name"
              value={userdata?.name}
              onChange={handelChange}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Email"
              value={userdata?.email}
              onChange={handelChange}
            />
          </div>
          <div>
            <input
              type="password"
              className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
              placeholder="Password"
              name="password"
              value={userdata?.password}
              onChange={handelChange}
            />
          </div>
          <div className="flex justify-center mb-3">
            <button
              type="submit"
              className="bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg"
            >
              Login
            </button>
          </div>
        </form>
        <div>
          <h2 className="text-white">
            Don't have an account{" "}
            <Link className="text-yellow-500 font-bold" to={"/signUp"}>
              Signup
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
