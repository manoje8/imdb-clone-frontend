import { useDispatch, useSelector } from "react-redux"
import DetailCard from "./DetailCard"
import { useEffect } from "react"
import { fetchActorById } from "../../redux/movie/movieAction"
import Loader from "../UI/Loader"

const ActorDetails = () => {
    const {actorDetails, isLoading} = useSelector(state => state.movies)
    const dispatch = useDispatch()
    let actorId = localStorage.getItem('actorId')

    useEffect(() => {
        dispatch(fetchActorById(actorId))
    },[dispatch, actorId])

    

    return (
        <div className="container">
            {
                isLoading ? <Loader /> :
                <div>
                    <div>
                        <h2>Name: {actorDetails.findActor?.name}</h2>
                        <p>Company: {actorDetails.findActor?.profile}</p>
                        <p>Bio: {actorDetails.findActor?.bio}</p>
                    </div>
                    <hr style={{backgroundColor: "#fff"}}/>
                    <DetailCard userMovie={actorDetails.findActorMovies}/>
                </div>
            }
        </div>
    )
}

export default ActorDetails