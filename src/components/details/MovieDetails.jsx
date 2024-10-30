import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteMovie, fetchMovieById } from "../../redux/movie/movieAction"
import "./MovieDetails.css"
import { Link, useNavigate } from "react-router-dom"
import { setActorId, setProducerId } from "../../redux/movie/movieSlice"
import Loader from "../UI/Loader"


const MovieDetails = () => {
    const {movieInfoById, isLoading} = useSelector(state => state.movies)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let movieId = localStorage.getItem("movieId")
    const token = localStorage.getItem("token")


    useEffect(() => {
        dispatch(fetchMovieById(movieId))
    },[dispatch, movieId])

    const handleActorClick = (id) => {
        dispatch(setActorId(id))
        navigate("/actor-details")
    }

    const handleProducerClick = (id) => {
        dispatch(setProducerId(id))
        navigate("/producer-details")
    }

    const handleDelete = useCallback(async() => {
        try
        {
            setLoading(true)
            if(window.confirm("Are you really want to delete ?"))
            {
                await dispatch(deleteMovie(movieId))
                navigate("/movie-list")
            }
        }catch(error){
            console.log(error);
            
        }finally {
            setLoading(false)
        }
        
    },[dispatch, movieId, navigate])
    

    return (
        <div className="container">
            {
                isLoading || loading ? <Loader />:
                <div className="row">
                    <div className="col-md-6 left-poster">
                        <img src={movieInfoById?.poster} alt="..." />
                    </div>
                    <div className="col-md-6 right-info">
                        <h4>{movieInfoById?.name} <span><i className="bi bi-star-fill"></i>{movieInfoById?.rating}</span></h4>
                        <p>{movieInfoById?.releaseYear}</p>
                        <p>{movieInfoById?.plot}</p>

                        <hr style={{backgroundColor: "#fff"}}/>

                        <h4>Stars</h4>
                        <ul>
                            {
                                movieInfoById.actorIds?.map((actor, id) => (
                                    <li key={id} onClick={() => handleActorClick(actor._id)}>
                                        <span>{actor?.name}</span>
                                    </li>
                                ))
                            }
                        </ul>

                        <hr style={{backgroundColor: "#fff"}}/>

                        <h4>Producer</h4>
                        <p onClick={() => handleProducerClick(movieInfoById.producerId._id)} >{movieInfoById?.producerId?.name}</p>

                        {
                            token ? 
                            (
                                <>
                                <hr style={{backgroundColor: "#fff"}}/>
                                <div>
                                    <span className="edit">
                                        <Link to={`/update-movie/${movieInfoById?._id}`}>
                                            <i className="bi bi-pencil-square mx-3"></i>
                                        </Link>
                                    </span>
                                    <span onClick={handleDelete} className="delete"><i className="bi bi-trash"></i></span>
                                </div>
                                </>
                            ) 
                            : ""
                        }


                        
                    </div>
                </div>
            }
        </div>
    )
}

export default MovieDetails