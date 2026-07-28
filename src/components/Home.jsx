import { useEffect, useState } from "react";
import { getPopularMovies } from "../api/tmdb";
import MovieCard from "./MovieCard";



function Home({ searchResults }) {

    const [movies, setMovies] = useState([])


    useEffect(() => {
        const fetchMovies = async () => {
            const data = await getPopularMovies();
            setMovies(data);
        }
        fetchMovies();


    }, [])

    return (

        <div className="bg-[#070B14] text-white p-4">
            <div className="max-w-7xl mx-auto">

                <h2 className="text-white text-4xl font-bold mb-6">
                    Popular
                </h2>
                <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-5 gap-8 mt-4">
                    {
                        (searchResults.length > 0 ? searchResults : movies).filter((movie) => movie.poster_path).map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />

                        ))
                    }
                </div>
            </div>
        </div>
    )
}


export default Home;