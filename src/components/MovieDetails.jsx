import { useNavigate, useParams } from "react-router-dom"
import { API_KEY } from "../api/tmdb"
import { useEffect, useRef, useState } from "react"
import "../App.css"
import play_btn from "../images/play-btn.png"

function MovieDetails() {
    const [details, setDetails] = useState(null)
    const [cast, setCast] = useState([])
    const [trailer, setTrailer] = useState(null)
    const [similarMovies, setSimilarMovies] = useState([])
    const [showTrailer, setShowTrailer] = useState(false)

    const { movieId } = useParams()
    const navigate = useNavigate()
    const carouselRef = useRef()
    const similarRef = useRef()

    useEffect(() => {
        const fetchMovieDetails = async (movieId) => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
            const data = await res.json()
            setDetails(data)
        }
        fetchMovieDetails(movieId)

        const getCast = async (movieId) => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`)
            const data = await res.json()
            setCast(data)
        }
        getCast(movieId)

        const getTrailer = async (movieId) => {
            const videoRes = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
            )

            const videoData = await videoRes.json()

            const movieTrailer = videoData.results.find(
                video => video.type === "Trailer" && video.site === "YouTube"
            )

            setTrailer(movieTrailer)
        }
        getTrailer(movieId)

        const getSimilarMovies = async (movieId) => {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`)
            const data = await res.json()
            setSimilarMovies(data)
        }
        getSimilarMovies(movieId)

    }, [movieId])

    return (
        <div className="bg-[#070B14] ">
            {details && (
                <div className="max-w-7xl mx-auto">
                    <div className="relative flex aspect-video">

                        {
                            showTrailer && trailer ? (<>
                                <button
                                    onClick={() => setShowTrailer(false)}
                                    className="absolute top-4 right-4 z-10 text-white text-3xl bg-transparent border border-[#64748B] hover:border-[#8B5CF6]"
                                >
                                    ✕
                                </button>
                                <iframe
                                    src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                                    title="Trailer"
                                    className="w-full h-full"
                                    allow="autoplay; fullscreen"
                                />
                            </>
                            ) : (
                                <>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w1280${details.backdrop_path}`}
                                        alt={details.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute px-4 pt-1 text-gray font-bold bg-gradient-to-r from-[#070B14] via-[#070B14]/70 to-transparent text-gray-200 h-full ">
                                        <p className="text-white text-xl sm:text-5xl md:text-3xl lg:text-7xl font-extrabold tracking-wide drop-shadow-2xl">{details.title}</p>

                                        <div className="flex items-center gap-4 my-2 text-sx sm:text-sm sm:my-4  md:text-md md:my-8 lg:text-xl">
                                            <p>⭐{(details.vote_average).toFixed(1)}</p>

                                            <img src={`https://image.tmdb.org/t/p/w200${details.production_companies[0]?.logo_path}`} alt="" className="max-w-12 bg-white m-1" />

                                            <p>{details.runtime && (details.runtime / 60).toFixed(1)}hrs</p>
                                        </div>

                                        <div className="flex items-center justify-between max-w-[90%] md:block">

                                            <div
                                                className=" max-w-[60%] sm:max-w-[50%] text-[8px]  sm:text-sm  md:text-md  lg:text-xl max-h-20 sm:max-h-none overflow-auto scrollbar-hide "
                                            >
                                                {details.overview}
                                            </div>


                                            <button
                                                onClick={() => setShowTrailer(true)}
                                                className=" flex items-start gap-2 text-[8px] sm:text-sm border-[2px] border-[#1E293B] p-2 rounded-xl cursor-pointer ml-2 bg-gray-900/25 md:mt-8 md:ml-0"
                                            >
                                                <img
                                                    src={play_btn}
                                                    alt=""
                                                    className="w-5 sm:w-6"
                                                />

                                                Watch Trailer

                                            </button>

                                        </div>
                                    </div>
                                </>
                            )
                        }

                    </div>
                    {cast?.cast?.length > 0 && (
                        <div className="relative p-4">
                            <h2 className="text-white font-bold text-xl mt-8 mb-4">Cast & Characters</h2>
                            <div ref={carouselRef} className=" flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth ">

                                {
                                    cast.cast?.filter((actor) => actor.profile_path).map((actor) => (
                                        <div
                                            key={actor.id}
                                            className="min-w-[150px] bg-gray-800 rounded-xl overflow-hidden bg-[#161D2F] border border-[#1E293B] hover:bg-[rgba(59,130,246,0.25)] cursor-pointer"
                                        >
                                            <img
                                                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                                alt={actor.name}
                                                className="w-full h-48 object-cover"
                                            />

                                            <p className="p-2 font-bold">
                                                {actor.name}
                                            </p>

                                            <p className="px-2 text-sm text-gray-400">
                                                {actor.character}
                                            </p>
                                        </div>
                                    ))
                                }

                            </div>
                            <button
                                onClick={() => {
                                    carouselRef.current.scrollLeft -= 300
                                }}
                                className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl text-white hover:bg-black/65 bg-black/45 rounded-full h-12 w-12 ml-4 text-center pb-1">
                                ←
                            </button>
                            <button
                                onClick={() => {
                                    carouselRef.current.scrollLeft += 300
                                }}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl text-white hover:bg-black/65 bg-black/45 rounded-full h-12 w-12 mr-4 text-center pb-1">
                                →
                            </button>
                        </div>
                    )}



                    <div className="relative p-4" >
                        <h2 className="text-white font-bold text-xl mt-8 ">Similar Movies</h2>
                        <div ref={similarRef} className="mt-8 flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth " >

                            {
                                similarMovies.results?.filter((result) => result.backdrop_path).map((result) => (
                                    <div onClick={() => navigate(`/movie/${result.id}`)}
                                        key={result.id}
                                        className="min-w-[150px] bg-gray-800 rounded-xl overflow-hidden bg-[#161D2F] border border-[#1E293B] hover:bg-[rgba(59,130,246,0.25)] cursor-pointer"
                                    >

                                        <img
                                            src={`https://image.tmdb.org/t/p/w185${result.poster_path}`}
                                            alt={result.original_title}
                                            className="w-full h-48 object-cover"
                                        />

                                        <p className="p-2 font-bold text-gray-300">
                                            {result.title}
                                        </p>


                                        <div className="px-1 py-2">
                                            <p className=" px-2 text-sm text-gray-400">
                                                Rating: ⭐{(result.vote_average).toFixed(1)}
                                            </p>
                                            <p className="px-2 text-sm text-gray-400">
                                                Release: {(result.release_date)}
                                            </p>
                                        </div>

                                    </div>
                                ))
                            }

                        </div>
                        <button
                            onClick={() => {
                                similarRef.current.scrollLeft -= 300
                            }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 text-3xl text-white hover:bg-black/65 bg-black/45 rounded-full h-12 w-12 ml-4 text-center pb-1">
                            ←
                        </button>
                        <button
                            onClick={() => {
                                similarRef.current.scrollLeft += 300
                            }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-3xl text-white hover:bg-black/65 bg-black/45 rounded-full h-12 w-12 mr-4 text-center pb-1">
                            →
                        </button>
                    </div>
                </div>
            )

            }
        </div>
    )
}

export default MovieDetails
