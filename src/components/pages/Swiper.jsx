import {  useEffect, useState } from "react";
import "./Swiper.css"
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../../redux/movie/movieAction";
import { useNavigate } from "react-router-dom";
import { setMovieId } from "../../redux/movie/movieSlice";

const Swiper = () => {
    const {data} = useSelector(state => state.movies)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [current, setCurrent] = useState(0);
    const [showCase, setShowCase] = useState([])
    
    useEffect(() => {
    dispatch(fetchMovies())
    },[dispatch])
    
    useEffect(() => {
        setShowCase(data.slice(0,4))
    },[data])

    const handleClick = (id) => {
        dispatch(setMovieId(id))
        navigate("/movies-details")
    }
    

    return (
        <div className="row">
            <div className="col-8">
                <div id="carousel-slide" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" onClick={() => handleClick(showCase[current]._id)}>
                        <div className="carousel-item active">
                            <img src={showCase[current]?.poster} className="d-block w-100 carousel-image" alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev carousel-control" type="button" data-target="#carousel-slide" data-slide="prev"  onClick={() => setCurrent(current === 0 ? showCase.length - 1 : current - 1)}>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="ipc-icon ipc-icon--chevron-left-inline ipc-icon--inline ipc-pager-icon" viewBox="0 0 24 24" fill="currentColor" role="presentation">
                            <path d="M18.378 23.369c.398-.402.622-.947.622-1.516 0-.568-.224-1.113-.622-1.515l-8.249-8.34 8.25-8.34a2.16 2.16 0 0 0 .548-2.07A2.132 2.132 0 0 0 17.428.073a2.104 2.104 0 0 0-2.048.555l-9.758 9.866A2.153 2.153 0 0 0 5 12.009c0 .568.224 1.114.622 1.515l9.758 9.866c.808.817 2.17.817 2.998-.021z"></path>
                        </svg>
                        <span className="sr-only">Previous</span>
                    </button>
                    <button className="carousel-control-next carousel-control" type="button" data-target="#carousel-slide" data-slide="next"  onClick={() => setCurrent((current + 1) % showCase.length)}>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path>
                        </svg>
                        <span className="sr-only">Next</span>
                    </button>
                    <div className="title-poster">
                        <div className="media-poster">
                            <img alt="..." className="poster-image" loading="eager" src= {showCase[current]?.poster} sizes="50vw, (min-width: 480px) 34vw, (min-width: 600px) 26vw, (min-width: 1024px) 16vw, (min-width: 1280px) 16vw" width="140" />
                        </div>
                        <figure className="media-title">
                            <figcaption>
                                <div className="play-icon">
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="play-icon-outline" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path>
                                        <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                                    </svg>
                                </div>
                                <div className="title-description">
                                    <div className="current-title">
                                        <span>{showCase[current]?.name}</span>
                                        <span>{showCase[current]?.plot}</span>
                                    </div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                </div>
            </div>
            <div className="col-4 trailers">
                <div className="title-box">
                    <span className="sub-title">Up next</span>
                </div>
                <div className="trailer-list">
                    {
                        showCase.map((data, id) => {
                            return (
                            current !== id ? (
                                <div className="trailer-box" key={id} onClick={() => handleClick(data._id)}>
                                    <div className="poster-image">
                                        <img src={data.poster} className="d-block w-100 carousel-image" alt="..."/>
                                    </div>
                                    <span>
                                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path>
                                            <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                                        </svg>
                                        <div className="poster-info">
                                            <p className="title">{data.name}</p>
                                            <p className="subtitle">{data.plot}</p>
                                        </div>
                                    </span>
                                </div>
                            ): ""
                        )})
                    }
                   
                </div>
                <div className="browse-trailers">
                    <a href="/movie-list">
                        Browse Movies
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="chevron-right" viewBox="0 0 24 24" fill="currentColor">
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Swiper