import { useDispatch, useSelector } from "react-redux"
import DetailCard from "./DetailCard"
import { useEffect } from "react"
import { fetchProducerById } from "../../redux/movie/movieAction"
import Loader from "../UI/Loader"

const ProducerDetails = () => {
    const {producerDetails, isLoading} = useSelector(state => state.movies)
    const dispatch = useDispatch()
    let producerId = localStorage.getItem('producerId')

    useEffect(() => {
        dispatch(fetchProducerById(producerId))
    },[dispatch, producerId])

    

    return (
        <div className="container">
                {isLoading ? <Loader /> : 
                <div>
                    <div>
                        <h2>Name: {producerDetails.findProducer?.name}</h2>
                        <p>Company: {producerDetails.findProducer?.company}</p>
                        <p>Bio: {producerDetails.findProducer?.bio}</p>
                    </div>
                    <hr style={{backgroundColor: "#fff"}}/>
                    <DetailCard userMovie={producerDetails.findProducerMovies}/>
                </div>
            }
                
            
            
        </div>
    )
}

export default ProducerDetails