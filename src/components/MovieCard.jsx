import { useNavigate } from "react-router-dom";



function MovieCard({ movie }) {
    const navigate = useNavigate();
    const imageUrl =`https://image.tmdb.org/t/p/w500${movie.poster_path}`
    return (

        <div onClick={()=>navigate(`/movie/${movie.id}`)} className="bg-[#161D2F] border border-[#1E293B] rounded-xl overflow-hidden hover:bg-[rgba(59,130,246,0.25)]">
            <img src={imageUrl} alt={movie.title} className="w-full object-cover" />
            <div className="mx-2 my-4">
                <h2>Name: {movie.title}</h2>
                <h2>Rating: ⭐{(movie.vote_average).toFixed(1)}</h2>
                <h2>Release: {movie.release_date}</h2>
            </div>
        </div>
    )
}

export default MovieCard
