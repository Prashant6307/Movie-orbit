import { useContext, useState } from "react"
import logo from "../images/logo-bg2.png"
import { FaSearch, FaBars, FaTimes } from "react-icons/fa"
import { API_KEY } from "../api/tmdb"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import userContext from "../utils/userContext"
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

function Header({ setSearchResults }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [userProfile, setUserProfile] = useState(false)
    const navigate = useNavigate();
    const { user, setUser } = useContext(userContext);
    const firstLetter = user?.displayName?.charAt(0).toUpperCase()


    const handleSearch = async (value) => {
        if (!value.trim()) return

        const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${value}`)
        const data = await res.json()
        setSearchResults(
            data.results.filter(
                item => item.media_type === "movie" || item.media_type === "tv"
            )
        )
        navigate(`/search?query=${value}`)
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);

            setUser(null);

            navigate("/");

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="bg-[rgba(7,11,20,0.85)]">
            <div className="flex justify-between items-center font-bold gap-4  px-4 py-4 sm:px-2 sm:py-2 max-w-7xl mx-auto">
                <div className="">
                    <Link to="/" onClick={() => setMenuOpen(false)}>
                        <img className="w-10 sm:w-12 md:w-16" src={logo} alt="app logo" />
                    </Link>
                </div>
                <div className="flex items-center gap-2 bg-[#111827] border-[2px] border-[#334155]  focus-within:border-[#3B82F6] rounded-xl cursor-pointer">
                    <input className="flex w-40 sm:w-56 md:w-92 max-h-8 focus:outline-none text-white px-2 sm:py-1 placeholder:text-xs sm:placeholder:text-base" type="text" onChange={(e) => setSearchValue(e.target.value)} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch(searchValue)
                        }
                    }} placeholder="Looking for something!" />
                    <FaSearch onClick={() => handleSearch(searchValue)} className="text-[#60A5FA] mx-2 " />
                </div>
                {
                    menuOpen ? <FaTimes onClick={() => setMenuOpen(false)} className="md:hidden min-w-4 size-4" /> : <FaBars onClick={() => setMenuOpen(true)} className="md:hidden min-w-4 size-4" />
                }
                
                {user && <li className="md:hidden w-6 h-6 bg-white rounded-full text-black flex justify-center items-center" onClick={() => setUserProfile(prev => !prev)}>
                    {firstLetter}
                    {userProfile && <div className=" absolute top-12 right-0 flex flex-col  gap-4 p-4 rounded-md z-100 bg-[#111827] border border-[#334155]">
                        <p className="w-full text-left px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#3B82F6] transition duration-200 cursor-pointer">Hi, {user?.displayName}</p>
                        <button onClick={() => handleLogout()} className="w-full text-left px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-red-400 transition duration-200 cursor-pointer">Logout</button>
                    </div>
                    }
                </li>}

                {
                    menuOpen && <ul className="md:hidden absolute top-20 right-4  flex flex-col  gap-4 text-black p-4 rounded-md z-40 bg-[#111827] border border-[#334155] rounded-xl shadow-2xl">
                        <li><Link to="/movies/popular" onClick={() => setMenuOpen(false)} className=" py-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#3B82F6] transition duration-200 cursor-pointer">
                            Home
                        </Link></li>
                        <li><Link to="/movies/trending" onClick={() => setMenuOpen(false)} className=" py-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#3B82F6] transition duration-200 cursor-pointer">
                            Movies
                        </Link>
                        </li>
                        <li><Link to="/tv-shows" onClick={() => setMenuOpen(false)} className=" py-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#3B82F6] transition duration-200 cursor-pointer">
                            TV Shows
                        </Link></li>
                    </ul>
                }

                <ul className="hidden md:flex md:text-sm items-center sm:gap-4 lg:gap-8 text-[#CBD5E1] relative">
                    <li className="hover:text-[#60A5FA]">
                        <Link to="/movies/popular" onClick={() => setMenuOpen(false)}>
                            Home
                        </Link>
                    </li>
                    <li className="hover:text-[#60A5FA]">
                        <Link to="/movies/trending" onClick={() => setMenuOpen(false)}>
                            Movies
                        </Link>
                    </li>
                    <li className="hover:text-[#60A5FA]">
                        <Link to="/tv-shows" onClick={() => setMenuOpen(false)}>
                            TV Shows
                        </Link>
                    </li>
                    {user && <li className="w-8 h-8 bg-white rounded-full text-black flex justify-center items-center text-lg" onClick={() => setUserProfile(prev => !prev)}>{firstLetter}
                        {userProfile && <div className=" absolute top-12 right-0 flex flex-col  gap-4 p-4 rounded-md z-100 bg-[#111827] border border-[#334155]">
                            <p className="w-full text-left px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#3B82F6] transition duration-200 cursor-pointer">Hi, {user?.displayName}</p>
                            <button onClick={() => handleLogout()} className="w-full text-left px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-red-400 transition duration-200 cursor-pointer">Logout</button>
                        </div>
                        }
                    </li>}
                </ul>

            </div>

        </div>
    )
}

export default Header
