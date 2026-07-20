import { useEffect, useState } from "react"
import { API_KEY } from "../api/tmdb"
import { useParams } from "react-router-dom"
import ShowCard from "./ShowCard"
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";

function TvShows() {

    const { category = "popular" } = useParams();
    const [show, setShow] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        const getCategories = async (category) => {
            let url;

            if (category === "trending") {
                url = "trending/tv/week"
            }
            else {
                url = `tv/${category}`
            }
            const res = await fetch(
                `https://api.themoviedb.org/3/${url}?api_key=${API_KEY}&page=${page}`
            )
            const data = await res.json();
            setShow(data.results || []);
            setTotalPages(data.total_pages)
        }
        getCategories(category)

        

    }, [category, page])


    return (
        <div className="bg-black text-white p-4 ">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold mb-8">
                    {category?.replace("_", " ").replace(/\b\w/g, char => char.toUpperCase())}
                </h1>


                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

                    {
                        show
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
                    setSearchParams={setSearchParams}
                    totalPages={totalPages}
                />
            </div>
        </div>
    )
}

export default TvShows
