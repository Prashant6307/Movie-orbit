import { useNavigate } from "react-router-dom";



function ShowCard({ show }) {
    const navigate = useNavigate();
    const imageUrl =`https://image.tmdb.org/t/p/w500${show.poster_path}`
    
    return (

        <div onClick={()=>navigate(`/tv-show/${show.id}`)} className="bg-[#161D2F] border border-[#1E293B] rounded-xl overflow-hidden hover:bg-[rgba(59,130,246,0.25)]">
            <img src={imageUrl} alt={show.name} className="w-full object-cover" />
            <div className="mx-2 my-4">
                <h2>Name: {show.name}</h2>
                <h2>Rating: ⭐{(show.vote_average)?.toFixed(1)}</h2>
                <h2>Release: {show.first_air_date}</h2>
            </div>
        </div>
    )
}

export default ShowCard
