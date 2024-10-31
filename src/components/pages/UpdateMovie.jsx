import { useDispatch, useSelector } from "react-redux";
import ButtonSpinner from "../UI/ButtonSpinner"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieById, updateMovie } from "../../redux/movie/movieAction";
import WithAuth from "../../utils/withAuth";

const UpdateMovie = () => {
    const {movieInfoById: movieData}= useSelector(state => state.movies)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    
    const [values, setValues] = useState({
        name: '',
        releaseYear: '',
        plot: '',
        poster: '',
        actors: [],
        producer: { name: "", company: "", bio: "" }
    });

    useEffect(() => {
        dispatch(fetchMovieById(id)) 
    },[dispatch, id])

    useEffect(() => {
        // Populate form with existing data when movieData is available
        if (movieData) {
            setValues({
                name: movieData.name,
                releaseYear: movieData.releaseYear,
                plot: movieData.plot,
                poster: movieData.poster,
                actors: movieData.actorIds || [],
                producer: movieData.producerId || { name: "", company: "", bio: "", profile: ""}
            });
        }
    }, [movieData]);

    const handleChange = ({ target: { name, value } }) => {
        setValues(prevValues => ({ ...prevValues, [name]: value }));
    };

    const handleActorChange = (index, { target: { name, value } }) => {
        const updatedActors = [...values.actors];
        updatedActors[index] = { ...updatedActors[index], [name]: value };
        setValues(prevValues => ({ ...prevValues, actors: updatedActors }));
    };

    const handleAddActorForm = () => {
        setValues(prevValues => ({
            ...prevValues,
            actors: [...prevValues.actors, { name: "", dob: "", bio: "" }]
        }));
    };

    const handleRemoveActorForm = (index) => {
        const updatedActors = [...values.actors];
        updatedActors.splice(index, 1);
        setValues(prevValues => ({ ...prevValues, actors: updatedActors }));
    };

    const handleProducerChange = ({ target: { name, value } }) => {
        setValues(prevValues => ({
            ...prevValues,
            producer: { ...prevValues.producer, [name]: value }
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate Release Year
        if (!/^\d{4}$/.test(values.releaseYear)) 
        {
            alert("Please enter a valid 4-digit year for the release year.");
            setLoading(false);
            return;
        }

        // Validate Actor Dates of Birth
        for (let actor of values.actors) {
            if (actor.dob && !/^\d{4}-\d{2}-\d{2}$/.test(actor.dob)) {
                alert("Please enter a valid date of birth (YYYY-MM-DD) for all actors.");
                return;
            }
        }

        try {
            setLoading(true);
            await dispatch(updateMovie({id, values}));
        } catch (error) {
            alert(error.message);
        } finally {
            navigate("/")
            setLoading(false);
        }
    };
    return (
        <div className="container-fluid new-title">
            <form onSubmit={handleSubmit} className="new-title-form">
                <p><b>Update Title</b></p>
                <div className="px-5 py-2">
                    <div className="form-group">
                        <label className="control-label">Name</label>
                        <input name="name" type="text" className="form-control form-control-sm" onChange={handleChange} value={values.name} required />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Plot</label>
                        <textarea name="plot" className="form-control form-control-sm" onChange={handleChange} value={values.plot} required />
                    </div>
                    <div className="form-group">
                        <label>Release Year</label>
                        <input name="releaseYear" type="text" className="form-control form-control-sm" onChange={handleChange} value={values.releaseYear} placeholder="2024" required/>
                    </div>
                    <div className="form-group">
                        <label>Poster</label>
                        <input name="poster" type="text" className="form-control form-control-sm" onChange={handleChange} value={values.poster} required/>
                    </div>
                </div>

                <p><b>Actors</b></p>
                {values.actors.map((actor, index) => (
                    <div key={index} className="px-5 py-2 p-2 mb-2">
                        <h6>Actor {index + 1}</h6>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                name="name"
                                type="text"
                                className="form-control form-control-sm"
                                onChange={(e) => handleActorChange(index, e)}
                                value={actor.name}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                name="dob"
                                type="text"
                                className="form-control form-control-sm"
                                onChange={(e) => handleActorChange(index, e)}
                                value={actor.dob}
                                placeholder="yyyy-mm-dd"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Bio</label>
                            <input
                                name="bio"
                                type="text"
                                className="form-control form-control-sm"
                                onChange={(e) => handleActorChange(index, e)}
                                value={actor.bio}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Profile</label>
                            <input
                                name="profile"
                                type="text"
                                className="form-control form-control-sm"
                                onChange={(e) => handleActorChange(index, e)}
                                value={actor.profile}
                                required
                            />
                        </div>
                        <button type="button" onClick={() => handleRemoveActorForm(index)} className="btn btn-danger btn-sm mt-2">Remove Actor</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddActorForm} className="btn btn-dark btn-sm mt-3">Add Another Actor</button>

                <p><b>Producer</b></p>
                <div className="px-5 py-2">
                    <div className="form-group">
                        <label>Name</label>
                        <input name="name" type="text" className="form-control form-control-sm" onChange={handleProducerChange} value={values.producer.name} required/>
                    </div>
                    <div className="form-group">
                        <label>Company</label>
                        <input name="company" type="text" className="form-control form-control-sm" onChange={handleProducerChange} value={values.producer.company} required/>
                    </div>
                    <div className="form-group">
                        <label>Bio</label>
                        <input name="bio" type="text" className="form-control form-control-sm" onChange={handleProducerChange} value={values.producer.bio} required/>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    {!loading ? 
                        <button type="submit" className="btn btn-primary">Update</button> 
                        :
                        <ButtonSpinner buttonName={"Updating"} />
                    }
                    <a className="btn btn-link" href="/movie-list">Cancel</a>
                </div>
            </form>
        </div>
    )
}

export default WithAuth(UpdateMovie)