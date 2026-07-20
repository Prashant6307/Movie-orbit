import { useEffect, useState } from "react";
import { API_KEY } from "../api/tmdb";
import MovieCard from "./MovieCard";
import { useParams } from "react-router-dom";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";

function Movies() {

    const { category, genreId, genreName } = useParams()
    const [movies, setMovies] = useState([])
    const [totalPages, setTotalPages] = useState(1);

    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;





    useEffect(() => {
        const getCategories = async (category) => {
            let url;

            if (category === "trending") {
                url = "trending/movie/day"
            }
            else {
                url = `movie/${category}`
            }

            if (genreId) {
                const res = await fetch(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
                )
                const data = await res.json();
                setMovies(data.results);
                setTotalPages(data.total_pages)
            }
            else {
                const res = await fetch(
                    `https://api.themoviedb.org/3/${url}?api_key=${API_KEY}&page=${page}`
                )
                const data = await res.json();
                setMovies(data.results);
                setTotalPages(data.total_pages)
            }
        }
        getCategories(category);

    }, [category, page, genreId])


    return (
        <div className="bg-black text-white p-4 ">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">
                    {genreName
                        ? genreName
                        : category ? category.replace("_", " ").replace(/\b\w/g, char => char.toUpperCase()) : "Genre Movies"}
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
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

                <Pagination
                    page={page}
                    setSearchParams={setSearchParams}
                    totalPages={totalPages}
                />
            </div>
        </div>
    )
}

export default Movies
