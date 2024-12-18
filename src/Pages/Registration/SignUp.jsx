import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, fireDB } from "../../Firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import myContext from "../../Context/Mycontext";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import Loader from "../../Loader/Loader";

function SignUp() {
    let context = useContext(myContext);
    const { loading, setLoading } = context;
  
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
        e.preventDefault(); // Fixed typo: preventDeafault -> preventDefault
        setLoading(true)

        // Validation check
        if (userdata.name === '' || userdata.email === '' || userdata.password === '') {
            setLoading(false);
            return toast.warn('All fields are mandatory', {
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
            const users = await createUserWithEmailAndPassword(auth, userdata.email, userdata.password);
            console.log(users);
            toast.success('Sign up successful', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            const userObj = {
                name: userdata.name,
                email: users.user.email,
                uid: users.user.uid,
                time:Timestamp.now()
            };
            const userRef = collection(fireDB, "users");
            await addDoc(userRef, userObj);   
            // Reset userdata after successful sign-up
            setUserData({ name: "", email: "", password: "" });
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false); // Stop loading state
            toast.error(error.message || 'An error occurred during signup', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
             {loading && <Loader/>}
            <div className="bg-gray-800 px-10 py-10 rounded-xl">
                <h1>{userdata?.name}</h1>
                <div className="">
                    <h1 className="text-center text-white text-xl mb-4 font-bold">
                        Signup
                    </h1>
                </div>
                <form onSubmit={handelSubmmit}>
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
                            name="password"
                            className="bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                            placeholder="Password"
                            value={userdata?.password}
                            onChange={handelChange}
                        />
                    </div>
                    <div className="flex justify-center mb-3">
                        <button
                            type="submit"
                            className="bg-red-500 w-full text-white font-bold px-2 py-2 rounded-lg"
                            disabled={loading} // Disable button if loading
                        >
                            {loading ? 'Signing Up...' : 'Signup'}
                        </button>
                    </div>
                </form>
                <div>
                    <h2 className="text-white">
                        Have an account{" "}
                        <Link className="text-red-500 font-bold" to={"/login"}>
                            Login
                        </Link>
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
