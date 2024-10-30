import { Link, useNavigate } from "react-router-dom"
import "./Content.css"
import { Next, Prev } from "../UI/ControlButton"
import Poster from "../UI/Poster"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { setMovieId } from "../../redux/movie/movieSlice"

const list = ['Popular', 'From A-Z']

const Content = () => {
    const {data} = useSelector(state => state.movies);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;

    const visibleItems = data.slice(startIndex, startIndex + itemsPerPage);

    const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name));
    const sortedItems = sortedData.slice(startIndex, startIndex + itemsPerPage);

    const itemTypes = [visibleItems, sortedItems]
    

    // Handlers for Next and Previous buttons
    const handleNext = () => {
        if (startIndex + itemsPerPage < data.length) {
            setStartIndex(startIndex + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (startIndex - itemsPerPage >= 0) {
            setStartIndex(startIndex - itemsPerPage);
        }
    };

    const handleClick = (id) => {
        dispatch(setMovieId(id))
        navigate("/movies-details")
    }

    return (
        <div className="content-container">
            <div className="base-title">
                <h3>What to watch</h3>
            </div>
            {
                list.map((list, id) => (
                    <section className="page-section" key={id}>
                        <div className="top-picks">
                            <div className="subsection-title">
                                <Link to="/movie-list">
                                    <h3 className="title-text">{list}
                                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="chevron-right" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M5.622.631A2.153 2.153 0 0 0 5 2.147c0 .568.224 1.113.622 1.515l8.249 8.34-8.25 8.34a2.16 2.16 0 0 0-.548 2.07c.196.74.768 1.317 1.499 1.515a2.104 2.104 0 0 0 2.048-.555l9.758-9.866a2.153 2.153 0 0 0 0-3.03L8.62.61C7.812-.207 6.45-.207 5.622.63z"></path>
                                    </svg>
                                    </h3>
                                </Link>
                                <div className="title-description">TV shows and movies just for you</div>
                            </div>
                            <div>
                                <div className="load-container">
                                    <div className="shoveler">
                                        <span onClick={handlePrev} disabled={startIndex === 0}><Prev /></span>
                                        {itemTypes[id].map((data, id) => (
                                            <div key={id} onClick={() => handleClick(data._id)}>
                                                <Poster image={data.poster} title={data.name} rating={data.rating}/>
                                            </div>
                                        ))}
                                        <span onClick={handleNext} disabled={startIndex + itemsPerPage >= data.length}><Next /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))
            }
        </div>
    )
}

export default Content