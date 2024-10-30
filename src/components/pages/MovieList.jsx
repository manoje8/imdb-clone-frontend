import { useDispatch, useSelector } from "react-redux"
import Poster from "../UI/Poster";
import "./MovieList.css"
import { useEffect } from "react";
import { fetchMovies } from "../../redux/movie/movieAction";
import { setMovieId } from "../../redux/movie/movieSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../UI/Loader";

const MovieList = () => {
    const {data, isLoading} = useSelector(state => state.movies)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchMovies())
        localStorage.removeItem("movieId")
    },[dispatch])

    const handleClick = (id) => {
        dispatch(setMovieId(id))
        navigate("/movies-details")
    }

    return (
        <div className="container-fluid">
            <h2 className="mt-3">Movie List</h2>
            <div className="movie-list">
                {
                    isLoading ? 
                    <Loader />
                    : 
                    data.map((movie) => (
                        <div key={movie._id} onClick={() => handleClick(movie._id)}>
                            <Poster title={movie.name} image={movie.poster} rating={movie.rating}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList