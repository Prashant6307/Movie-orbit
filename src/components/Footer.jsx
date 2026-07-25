import { useEffect, useState } from "react"
import logo_bg from "../images/logo-bg.png"
import { Link, useLocation } from "react-router-dom"
import { FaGithub, FaLinkedin } from "react-icons/fa"

const taglines = [
    "Explore the universe of movies.",
    "Your galaxy of entertainment.",
    "Discover movies beyond the ordinary.",
    "Orbit through endless stories."
]

function Footer() {

    const [tagline, setTagline] = useState("")
    const [index, setIndex] = useState(0)

    const location = useLocation();

    const isMoviePage = location.pathname.startsWith("/movies");
    const isTVPage = location.pathname.startsWith("/tv-shows");

    useEffect(() => {
        let i = 0
        let timeout

        const typing = setInterval(() => {
            setTagline(taglines[index].slice(0, i))
            i++

            if (i > taglines[index].length) {
                clearInterval(typing)

                timeout = setTimeout(() => {
                    setIndex((prev) => (prev + 1) % taglines.length)
                }, 2000)
            }

        }, 80);

        return () => {
            clearInterval(typing)
            clearTimeout(timeout)
        };
    }, [index])


    return (
        <div className="bg-[#0B1120] text-white font-bold p-8">
            <div className=" max-w-7xl mx-auto ">
                <div className="flex items-center gap-4">
                    <img src={logo_bg} alt="footer-logo" className="max-w-20 w-12" />
                    <h1 className="flex items-center gap-1 text-xl font-bold text-white">

                        <span className="text-white">Movie </span>
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Orbit
                        </span>


                    </h1>
                    <p className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent text-xs [@media(max-width:340px)]:hidden">
                        {tagline}
                        <span className="animate-pulse text-blue-400">|</span>
                    </p>
                </div>
                <h3 className="mt-2 text-sm">
                    Your ultimate destination for discovering movies,
                    exploring trending titles, and finding your next
                    favorite watch.
                </h3>
                <div className="flex justify-between max-w-124 mt-12">
                    
                    <div>

                        <h3 className="text-lg font-bold mb-5">
                            Discover
                        </h3>


                        <div className="space-y-3">

                            {
                                (!isMoviePage || isMoviePage) && (
                                    <>

                                        <Link
                                            to="/movies/trending"
                                            className="block text-[#94A3B8] hover:text-purple-400 text-sm"
                                        >
                                            Trending
                                        </Link>


                                        <Link
                                            to="/movies/popular"
                                            className="block text-[#94A3B8] hover:text-purple-400 text-sm"
                                        >
                                            Popular
                                        </Link>


                                        <Link
                                            to="/movies/top_rated"
                                            className="block text-[#94A3B8] hover:text-purple-400 text-sm"
                                        >
                                            Top Rated
                                        </Link>


                                        <Link
                                            to="/movies/upcoming"
                                            className="block text-[#94A3B8] hover:text-purple-400 text-sm"
                                        >
                                            Upcoming
                                        </Link>



                                        <Link
                                            to="/movies/genre/28/Action"
                                            className="block text-[#94A3B8] hover:text-purple-400 text-sm"
                                        >
                                            Action
                                        </Link>


                                        <Link
                                            to="/movies/genre/35/Comedy"
                                            className="block text-[#94A3B8] hover:text-purple-400 text-sm"
                                        >
                                            Comedy
                                        </Link>
                                    </>
                                )
                            }


                            {
                                isTVPage && (
                                    <Link
                                        to="/tv-shows/genre/10765/Sci-Fi"
                                        className="block text-[#94A3B8] hover:text-purple-400 text-sm"
                                    >
                                        Sci-Fi
                                    </Link>
                                )
                            }

                        </div>

                    </div>

                    <div>

                        <h3 className="text-lg font-bold mb-5">
                            Support
                        </h3>


                        <div className="space-y-3">

                            <p className="text-[#94A3B8] text-sm hover:text-purple-400 cursor-pointer">
                                Help Center
                            </p>

                            <p className="text-[#94A3B8] text-sm hover:text-purple-400 cursor-pointer">
                                FAQ
                            </p>

                            <p className="text-[#94A3B8] text-sm hover:text-purple-400 cursor-pointer">
                                Contact
                            </p>

                            <p className="text-[#94A3B8] text-sm hover:text-purple-400 cursor-pointer">
                                Feedback
                            </p>

                        </div>

                    </div>
                    <div>

                        <h3 className="text-lg font-bold mb-5">
                            Follow Us
                        </h3>


                        <div className="flex flex-col gap-3">

                            <a
                                href="https://github.com/Prashant6307"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex items-center gap-1 text-[#94A3B8] text-sm hover:text-purple-400 cursor-pointer ">
                                    <FaGithub
                                    className=" text-lg sm:text-xl md:text-2xl text-[#94A3B8] hover:text-white transition "
                                /> Github
                                </div>
                                
                            </a>


                            <a
                                href="https://www.linkedin.com/in/prashant-kumar-0b9a9a339/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="flex items-center gap-1 text-[#94A3B8] text-sm hover:text-purple-400 cursor-pointer">
                                    <FaLinkedin
                                    className=" text-lg sm:text-xl md:text-2xl text-[#94A3B8] hover:text-[#60A5FA] transition "
                                /> Linkedin
                                </div>
                                
                            </a>

                        </div>

                    </div>


                </div>


                <h3 className="text-md mb-2 mt-12">Powered by TMDB</h3>
                <p className="text-xs">Movie Orbit uses TMDB data but is not endorsed
                    or certified by TMDB.</p>

                <div className="flex gap-16 mt-8 ">
                    <h3>© 2026 Movie Orbit</h3>
                    <h3> Privacy | Terms | Cookies</h3>
                </div>

            </div>

        </div>
    )
}

export default Footer
