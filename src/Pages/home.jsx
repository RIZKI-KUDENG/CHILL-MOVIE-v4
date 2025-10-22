import Hero from "../Components/Fragments/Hero/Hero";
import { useMovies } from "../store/useMovies";
import { useEffect } from "react";
import MovieSlider from "../Components/Fragments/Movies/MovieSlider";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../store/redux/movieSlice";

const HomePage = () => {
  // const { getMovies, movies, isLoading } = useMovies();
  // useEffect(() => {
  //   getMovies();
  // }, []);
  const dispatch = useDispatch();
  const {movies, isLoading} = useSelector((state) => state.movies);
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  useEffect(() => {
  console.log("Movies setelah fetch:", movies);
}, [movies]);
  const top = movies.filter((movie) => movie.kategori === "Top");
  const New = movies.filter((movie) => movie.kategori === "New");
  const trending = movies.filter((movie) => movie.kategori === "Trending");

  return (
    <>
      <Hero />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <MovieSlider title="Top Movie" movies={top} />
      )}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <MovieSlider title="New Movie" movies={New} />
      )}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <MovieSlider title="Trending Movie" movies={trending} />
      )}
    </>
  );
};

export default HomePage;
