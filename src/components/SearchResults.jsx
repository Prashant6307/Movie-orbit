import { useSearchParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { API_KEY } from "../api/tmdb";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";

function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [searchData, setSearchData] = useState([])

    let [page, setPage] = useState(1)

    useEffect(() => {
        if (!query) return
        const getMovie = async (query) => {
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`)
            const data = await res.json()
            setSearchData(data.results);

        }
        getMovie(query)
    }, [query, page])


    return (


        <div className="bg-black text-white p-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold">
                    {query ? `Search result for "${query}"` : "Popular Movies"}
                </h1>
                <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-8 mt-4">

                    {searchData.filter((movie) => movie.poster_path).map((movie) => <MovieCard key={movie.id} movie={movie} />)
                    }


                </div>
                <Pagination
                    page={page}
                    setPage={setPage}
                />
            </div>
        </div>
    )
}

export default SearchResults
