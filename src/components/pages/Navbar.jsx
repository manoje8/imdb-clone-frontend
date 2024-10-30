import { useDispatch, useSelector } from "react-redux"
import "./Navbar.css"
import { useEffect, useState } from "react"
import { setMovieId } from "../../redux/movie/movieSlice"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
    const {data} = useSelector(state => state.movies)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState("")
    const [filteredValue, setFilteredValue] = useState([])

    const token = localStorage.getItem("token")
    const userName = localStorage.getItem("name")
    
    useEffect(() => {
        setFilteredValue(data.filter(movie => movie?.name.toLowerCase().includes(searchValue.toLowerCase())))
    }, [data, searchValue])

    const handleClick = (id) => {
        dispatch(setMovieId(id))
        navigate("/movies-details")
        setSearchValue("")
    }

    const handleLogout = () => {
        localStorage.clear()
    }

    return (
        <nav className="nav-bar">
            <div className="nav-list nav-list-left">
                <a id="nav-logo"  href="/">IMDB</a>
                <a href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"></path>
                    </svg>
                    <span className="icon-text">Menu</span>
                </a>
                <div className="search-bar">
                    <input type="text" className="form-control form-control-sm" placeholder="Search IMDb" onChange={(e) => setSearchValue(e.target.value)}/>
                    {searchValue && (
                        <div className="dropdown-container">
                            <ul>
                                {filteredValue.map(movie => (
                                    <li onClick={() => handleClick(movie._id)} key={movie._id}>{movie.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>


            <div className="nav-list nav-list-right">
                {
                    token ? 
                    (<a href="/add-movie">
                        <i className="bi bi-plus-lg"></i>
                        <span>Add</span>
                    </a>)
                    : ""
                }
                
                <a href="/">
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17 3c1.05 0 1.918.82 1.994 1.851L19 5v16l-7-3-7 3V5c0-1.05.82-1.918 1.851-1.994L7 3h10zm-4 4h-2v3H8v2h3v3h2v-3h3v-2h-3V7z" fill="currentColor"></path>
                    </svg>
                    <span className="icon-text">Watchlist</span>
                </a>
                <a href="/auth/login">{token ? userName : "Sign In"}</a>
                {
                    token ? <a href="/" className="btn btn-sm logout" onClick={handleLogout}><i className="bi bi-box-arrow-left"></i></a> : ""
                }
                <div className="language">
                    <select>
                        <option value="">En</option>
                    </select>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
