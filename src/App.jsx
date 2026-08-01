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
import ProtectedRoute from "./components/ProtectedRoute";

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

          
          <Route
            path="/"
            element={<Signup />}
          />


          
          <Route
            element={
              <ProtectedRoute>
                <Layout
                  setSearchResults={setSearchResults}
                />
              </ProtectedRoute>

            }
          >


            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home
                    searchResults={searchResults}
                  />
                </ProtectedRoute>

              }
            />


            <Route
              path="/movie/:movieId"
              element={<ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
              }
            />


            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchResults
                    searchResults={searchResults}
                  />
                </ProtectedRoute>
              }
            />


            <Route
              path="/movies/:category"
              element={
                <ProtectedRoute>
                  <Movies />
                </ProtectedRoute>
              }
            />


            <Route
              path="/movies/genre/:genreId"
              element={<ProtectedRoute>
                <Movies />
              </ProtectedRoute>
              }
            />


            <Route
              path="/movies/genre/:genreId/:genreName"
              element={<ProtectedRoute>
                <Movies />
              </ProtectedRoute>
              
            }
            />


            <Route
              path="/tv-shows"
              element={<ProtectedRoute>
                <TvShows />
              </ProtectedRoute>
              
            }
            />


            <Route
              path="/tv-shows/:category"
              element={<ProtectedRoute>
                <TvShows
                  searchResults={searchResults}
                />
              </ProtectedRoute>
                
              }
            />


            <Route
              path="/tv-shows/genre/:genreId"
              element={<ProtectedRoute>
                <TvShows />
              </ProtectedRoute>
              
            }
            />


            <Route
              path="/tv-shows/genre/:genreId/:genreName"
              element={
                <ProtectedRoute>
                  <TvShows />
                </ProtectedRoute>
              
            }
            />


            <Route
              path="/tv-show/:showId"
              element={<ProtectedRoute>
                <ShowDetails />
              </ProtectedRoute>
              
            }
            />


          </Route>


        </Routes>

      </BrowserRouter>

    </userContext.Provider>

  )
}


export default App;