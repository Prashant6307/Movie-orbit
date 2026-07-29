import { useRef, useState } from "react"
import signup_bg from "../images/signup_bg.png"
import { checkValidData } from "../utils/validate"

function Signup() {
    const [isSignInForm, setIsSignInForm] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const email = useRef(null)
    const password = useRef(null)

    const toggleForm = () => {
        setIsSignInForm(!isSignInForm)
    }

    const handleBtnClick = () => {
        const message = checkValidData(email.current.value, password.current.value)    
        setErrorMessage(message)    
    }

    return (
        <div className="relative w-full min-h-screen bg-[#070B14] flex justify-center items-center">

            <img
                src={signup_bg}
                alt=""
                className="absolute inset-0 w-full max-w-full h-full object-contain overflow-hidden"
            />

            <form onSubmit={(e) => { e.preventDefault() }} className="relative z-10 bg-[#070B14]/75 p-8 rounded-xl text-white font-bold ">
                <h2 className="text-3xl mb-4">{isSignInForm ? "Sign in" : "Sign up"}</h2>
                <div className="flex flex-col gap-2  ">
                    <label htmlFor="email" className="text-white ">Email</label>
                    <input 
                    type="email" 
                    name="email" 
                    autoComplete="username"
                    ref={email}
                    className="px-2 py-1 focus:outline-none bg-[#111827] border-[2px] border-[#334155]  focus-within:border-[#3B82F6] rounded-md cursor-pointer text-white" />

                    <label htmlFor="password" className="text-white mt-4">Password</label>
                    <input 
                    type="password" 
                    name="password" 
                    autoComplete="current-password"
                    ref={password}
                    className="px-2 py-1 focus:outline-none bg-[#111827] border-[2px] border-[#334155]  focus-within:border-[#3B82F6] rounded-md cursor-pointer text-white" />

                    <p className="text-lg fond-bold text-red-600">{errorMessage}</p>

                    <div className="flex justify-center mt-4">
                        <button onClick={handleBtnClick} className="text-xl bg-[#3B82F6] px-4 py-2 rounded-lg cursor-pointer">{isSignInForm ? "Sign in" : "Sign up"}</button>
                    </div>

                    <p onClick={toggleForm} className="cursor-pointer mt-4 ">{!isSignInForm ? "Already a user? Sign in" : "New to the page? Sign up"}</p>
                </div>

            </form>

        </div>
    )
}

export default Signup
