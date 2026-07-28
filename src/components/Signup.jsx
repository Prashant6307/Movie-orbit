import signup_bg from "../images/signup_bg.png"

function Signup() {
    return (
        <div className="relative w-full min-h-screen bg-[#070B14] flex justify-center items-center">

            <img
                src={signup_bg}
                alt=""
                className="absolute inset-0 w-full h-full object-contain "
            />

            <form onSubmit={(e) => { e.preventDefault() }} className="relative z-10 bg-[#070B14]/75 p-8 rounded-xl text-white font-bold text-xl">
                <h2 className="text-3xl mb-4">Sign up</h2>
                <div className="flex flex-col gap-2  ">
                    <label htmlFor="email" className="text-white ">Email</label>
                    <input type="email" name="email" className="px-2 py-1 focus:outline-none bg-[#111827] border-[2px] border-[#334155]  focus-within:border-[#3B82F6] rounded-md cursor-pointer text-white" />
                    <label htmlFor="password" className="text-white mt-4">Password</label>
                    <input type="password" name="password" className="px-2 py-1 focus:outline-none bg-[#111827] border-[2px] border-[#334155]  focus-within:border-[#3B82F6] rounded-md cursor-pointer text-white" />
                </div>

            </form>

        </div>
    )
}

export default Signup
