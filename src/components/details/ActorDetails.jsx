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

    const profileStyle = {
        height: "100px",
        width: "100px",
        borderRadius: "8px",
        objectFit: "fill"
    }
    

    return (
        <div className="container">
            {
                isLoading ? <Loader /> :
                <div className="p-3">
                    <div className="d-flex">
                        <img style={profileStyle} className="profile" src={actorDetails.findActor?.profile} alt="..." />
                        <div className="mx-2">
                            <h2>{actorDetails.findActor?.name}</h2>
                            <p>{actorDetails.findActor?.bio}</p>
                        </div>
                    </div>
                    <hr style={{backgroundColor: "#fff"}}/>
                    <DetailCard userMovie={actorDetails.findActorMovies}/>
                </div>
            }
        </div>
    )
}

export default ActorDetails