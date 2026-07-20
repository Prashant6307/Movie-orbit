import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import { useState } from "react";
import MovieDetails from "./components/MovieDetails";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";
import Movies from "./components/Movies";
import CategoryNav from "./components/CategoryNav";
import TvShows from "./components/TvShows";
import ShowDetails from "./components/ShowDetails";



function App() {
  const [searchResults, setSearchResults] = useState([])
  return (

    <BrowserRouter>
      <Header setSearchResults={setSearchResults} />
      <CategoryNav />
      <Routes>

        <Route 
        path="/" 
        element={<Home searchResults={searchResults} />} />

        <Route
          path="/movie/:movieId"
          element={<MovieDetails />}
        />

        <Route
          path="/search"
          element={<SearchResults />}
        />

        <Route
          path="/movies/:category"
          element={<Movies />}
        />

        <Route path="/tv-shows" element={<TvShows />} />

        <Route
          path="/tv-shows/:category"
          element={<TvShows searchResults={searchResults}/>}
        />

        <Route
          path="/tv-show/:showId"
          element={<ShowDetails />}
        />
      
      </Routes>
      <Footer />

    </BrowserRouter>

  )

}

export default App;