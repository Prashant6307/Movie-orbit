import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import SearchResults from "./components/SearchResults";
import Movies from "./components/Movies";
import TvShows from "./components/TvShows";
import ShowDetails from "./components/ShowDetails";
import Signup from "./components/Signup";
import Layout from "./components/Layout";
import userContext from "./utils/userContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";


function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }

    })


    return () => unsubscribe()

  }, []);

  return (

    <userContext.Provider
      value={{ user, setUser }}
    >

      <BrowserRouter>

        <Routes>

          {/* Signup/Login page without Header and Footer */}
          <Route
            path="/"
            element={<Signup />}
          />


          {/* Pages with Header, CategoryNav and Footer */}
          <Route
            element={
              <Layout
                setSearchResults={setSearchResults}
              />
            }
          >


            <Route
              path="/home"
              element={
                <Home
                  searchResults={searchResults}
                />
              }
            />


            <Route
              path="/movie/:movieId"
              element={<MovieDetails />}
            />


            <Route
              path="/search"
              element={
                <SearchResults
                  searchResults={searchResults}
                />
              }
            />


            <Route
              path="/movies/:category"
              element={<Movies />}
            />


            <Route
              path="/movies/genre/:genreId"
              element={<Movies />}
            />


            <Route
              path="/movies/genre/:genreId/:genreName"
              element={<Movies />}
            />


            <Route
              path="/tv-shows"
              element={<TvShows />}
            />


            <Route
              path="/tv-shows/:category"
              element={
                <TvShows
                  searchResults={searchResults}
                />
              }
            />


            <Route
              path="/tv-shows/genre/:genreId"
              element={<TvShows />}
            />


            <Route
              path="/tv-shows/genre/:genreId/:genreName"
              element={<TvShows />}
            />


            <Route
              path="/tv-show/:showId"
              element={<ShowDetails />}
            />


          </Route>


        </Routes>

      </BrowserRouter>

    </userContext.Provider>

  )
}


export default App;