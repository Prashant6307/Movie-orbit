import { useRef, useState } from "react"
import signup_bg from "../images/signup_bg.png"
import { useNavigate } from "react-router-dom";
import { checkValidData } from "../utils/validate"
import { auth } from "../utils/firebase"
import { useContext } from "react";
import userContext from "../utils/userContext";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"

function Signup() {
    const navigate = useNavigate();
    const [isSignInForm, setIsSignInForm] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const { setUser } = useContext(userContext);
    const username = useRef(null)
    const email = useRef(null)
    const password = useRef(null)

    const toggleForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    const handleBtnClick = () => {
        const message = checkValidData(email.current.value, password.current.value)
        setErrorMessage(message)

        if (message) return

        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then(async (userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    await updateProfile(user, {
                        displayName: username.current.value
                    });
                    setUser({
                        ...user,
                        displayName: username.current.value
                    });

                    navigate("/movies/popular")
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + ":" + errorMessage)
                    // ..
                })

        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    setUser(user)
                    navigate("/movies/popular")

                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + ":" + errorMessage)
                });


        }
    }

    return (
        <div className="relative w-full min-h-screen bg-[#070B14] flex justify-center items-center overflow-hidden">

            <img
                src={signup_bg}
                alt=""
                className="absolute max-w-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />

            <form onSubmit={(e) => { e.preventDefault() }} className="relative z-10 bg-[#070B14]/75 p-8 rounded-xl text-white font-bold ">
                <h2 className="text-3xl mb-4">{isSignInForm ? "Sign in" : "Sign up"}</h2>
                <div className="flex flex-col gap-2  ">
                    {!isSignInForm &&
                        <>
                            <label htmlFor="name" className="text-white ">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                autoComplete="name"
                                ref={username}
                                required
                                className="px-2 py-1 focus:outline-none bg-[#111827] border-[2px] border-[#334155]  focus:border-[#3B82F6] rounded-md cursor-pointer text-white" />
                        </>
                    }

                    <label htmlFor="email" className="text-white ">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="username"
                        ref={email}
                        required
                        className="px-2 py-1 focus:outline-none bg-[#111827] border-[2px] border-[#334155]  focus:border-[#3B82F6] rounded-md cursor-pointer text-white" />

                    <label htmlFor="password" className="text-white mt-4">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete={
                            isSignInForm
                                ? "current-password"
                                : "new-password"
                        }
                        ref={password}
                        required        
                        className="px-2 py-1 focus:outline-none bg-[#111827] border-[2px] border-[#334155]  focus:border-[#3B82F6] rounded-md cursor-pointer text-white" />

                    <p className="text-lg fond-bold text-red-600">{errorMessage}</p>

                    <div className="flex justify-center mt-4">
                        <button onClick={handleBtnClick} className="text-xl bg-[#3B82F6] px-4 py-2 rounded-lg cursor-pointer">{isSignInForm ? "Sign in" : "Sign up"}</button>
                    </div>

                    <p onClick={toggleForm} className="cursor-pointer mt-4 text-lg">{!isSignInForm ? "Already a user? Sign in" : "New to the page? Sign up"}</p>
                </div>

            </form>

        </div>
    )
}

export default Signup
