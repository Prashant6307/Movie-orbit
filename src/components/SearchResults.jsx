import { useSearchParams } from "react-router-dom"
import MovieCard from "./MovieCard"
import { API_KEY } from "../api/tmdb"
import { useEffect, useState } from "react"
import Pagination from "./Pagination"
import ShowCard from "./ShowCard"

function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("query")
    const [searchData, setSearchData] = useState([])

    const page = Number(searchParams.get("page")) || 1

    const [totalPages, setTotalPages] = useState(1)

    const movies = searchData.filter(
        item => item.media_type === "movie"
    )

    const shows = searchData.filter(
        item => item.media_type === "tv"
    )

    useEffect(() => {
        if (!query) return

        const getMovie = async () => {
            const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}&page=${page}`)
            const data = await res.json()
            setSearchData(data.results || [])
            setTotalPages(data.total_pages || 1)
        }
        getMovie()
    }, [query, page])


    return (


        <div className="bg-black text-white p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold">
                    {`Search result for "${query}"`}
                </h1>
                <h2 className="text-3xl font-bold mt-8">Movies</h2>
                <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-8 mt-4">

                    {
                        movies
                            .filter(movie => movie.poster_path)
                            .map(movie => (
                                <MovieCard
                                    key={movie.id}
                                    movie={movie}
                                />
                            ))
                    }
                </div>
                <h2 className="mt-8 text-3xl font-bold">
                    TV Shows
                </h2>
                <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-8 mt-4">

                    {
                        shows
                            .filter(show => show.poster_path)
                            .map(show => (
                                <ShowCard
                                    key={show.id}
                                    show={show}
                                />
                            ))
                    }
                </div>
                <Pagination
                    page={page}
                    totalPages={totalPages}
                    setSearchParams={setSearchParams}
                />
            </div>
        </div>
    )
}

export default SearchResults
