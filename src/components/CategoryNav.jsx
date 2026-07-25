import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function CategoryNav() {

    const navigate = useNavigate();
    const location = useLocation();

    const category = location.pathname.split("/")[2];

    const isTvPage = location.pathname.includes("tv-shows");

    const path = isTvPage ? "tv-shows" : "movies";

    const [showGenres, setShowGenres] = useState(false);

    const categories = [
        {
            name: "Popular",
            value: "popular"
        },
        {
            name: "Top Rated",
            value: "top_rated"
        },
        {
            name: "Trending",
            value: "trending"
        },
        {
            name: isTvPage ? "Airing Today" : "Upcoming",
            value: isTvPage ? "airing_today" : "upcoming"
        },
        {
            name: "Genres",
            genres: isTvPage ?
                [
                    {
                        name: "Action & Adventure",
                        id: 10759
                    },
                    {
                        name: "Animation",
                        id: 16
                    },
                    {
                        name: "Comedy",
                        id: 35
                    },
                    {
                        name: "Crime",
                        id: 80
                    },
                    {
                        name: "Documentary",
                        id: 99
                    },
                    {
                        name: "Drama",
                        id: 18
                    },
                    {
                        name: "Family",
                        id: 10751
                    },
                    {
                        name: "Kids",
                        id: 10762
                    },
                    {
                        name: "Mystery",
                        id: 9648
                    },
                    {
                        name: "News",
                        id: 10763
                    },
                    {
                        name: "Reality",
                        id: 10764
                    },
                    {
                        name: "Sci-Fi & Fantasy",
                        id: 10765
                    },
                    {
                        name: "Soap",
                        id: 10766
                    },
                    {
                        name: "Talk",
                        id: 10767
                    },
                    {
                        name: "War & Politics",
                        id: 10768
                    },
                    {
                        name: "Western",
                        id: 37
                    }
                ] : [
                    {
                        name: "Action",
                        id: 28
                    },
                    {
                        name: "Comedy",
                        id: 35
                    },
                    {
                        name: "Horror",
                        id: 27
                    },
                    {
                        name: "Sci-Fi",
                        id: 878
                    }
                ]
        }
    ]


    return (
        <div className="bg-black text-white flex justify-center py-4">

            {
                categories.map((item) => (

                    item.genres ? (

                        <div
                            key={item.name}
                            className="relative"
                            onMouseEnter={() => setShowGenres(true)}
                            onMouseLeave={() => setShowGenres(false)}
                        >

                            <button
                                className="px-2 sm:px-4 py-2 cursor-pointer font-bold text-[10px]  sm:text-[16px] md:text-lg lg:text-2xl text-gray-400"
                            >
                                Genres
                            </button>

                            {
                                showGenres && (
                                    <div
                                        className="absolute top-full -left-10 sm:-left-20 max-w-max bg-[#111827] border border-[#334155] rounded-xl shadow-2xl p-3 z-50 text-sm md:text-md lg:text-lg md:pr-2"
                                    >
                                        {
                                            item.genres.map((genre) => (

                                                <button
                                                    key={genre.id}
                                                    onClick={() => navigate(`/${path}/genre/${genre.id}/${genre.name}`)}
                                                    className="w-full text-left px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#3B82F6] transition duration-200 " onMouseEnter={() => setShowGenres(true)}
                                                >
                                                    {genre.name}
                                                </button>

                                            ))
                                        }

                                    </div>
                                )
                            }

                        </div>

                    ) : (

                        <button
                            key={item.value}
                            onClick={() => navigate(`/${path}/${item.value}`)}
                            className={`px-2 sm:px-4 py-2 cursor-pointer font-bold text-[10px]  sm:text-[16px] md:text-lg lg:text-2xl ${category === item.value
                                    ? "text-purple-500"
                                    : "text-gray-400"
                                }`}
                        >
                            {item.name}
                        </button>

                    )

                ))
            }


        </div >
    )
}

export default CategoryNav;