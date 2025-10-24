import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../store/redux/movieSlice";

const ListView = () => {
  const dispatch = useDispatch();
  const { movies, isLoading, error } = useSelector((state) => state.movies);
  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Daftar Semua Film</h2>
      {movies.length === 0 ? (
        <p>Tidak ada data</p>
      ) : (
        <ul className="text-center">
          {movies.map((movie) => (
            <li key={movie.id} className="mb-2">
              <strong className="font-semibold">{movie.title}</strong> - (
              {movie.kategori || "Tidak ada kategori"})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListView;