import { useDispatch } from "react-redux"
import Poster from "../UI/Poster"
import { useNavigate } from "react-router-dom"
import { setMovieId } from "../../redux/movie/movieSlice"

const DetailCard = ({userMovie}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = (id) => {
        dispatch(setMovieId(id))
        navigate("/movies-details")
        
    }
    return (
    <div>
        <h2 className="">Movies</h2>
        <div className="movie-list">
            {
                userMovie?.map(movie => (
                    <div key={movie._id} onClick={() => handleClick(movie._id)}>
                        <Poster image={movie.poster} rating={movie.rating} title={movie.name} />
                    </div>
                ))
            }
        </div>
    </div>
)}

export default DetailCard