import React, { useState } from 'react';
import ButtonSpinner from '../UI/ButtonSpinner';
import "./AddMovie.css"
import { useDispatch } from 'react-redux';
import { addMovie } from '../../redux/movie/movieAction';
import { useNavigate } from 'react-router-dom';
import WithAuth from '../../utils/withAuth';

const AddMovie = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState({
        name: '',
        releaseYear: '',
        plot: '',
        poster: '',
        actors: [],
        producer: { name: "", company: "", bio: "" }
    });

    const [actorForms, setActorForms] = useState([{ name: "", dob: "", bio: "", profile: "" }]);

    const handleChange = ({ target: { name, value } }) => {
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleActorChange = (index, { target: { name, value } }) => {
        const updatedActorForms = [...actorForms];
        updatedActorForms[index] = { ...updatedActorForms[index], [name]: value };
        setActorForms(updatedActorForms);
    };

    const handleAddActorForm = (e) => {
        e.preventDefault();
        setActorForms([...actorForms, { name: "", dob: "", bio: "" }]);
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
            return;
        }

        // Validate Actor Dates of Birth
        for (let actor of actorForms) {
            if (actor.dob && !/^\d{4}-\d{2}-\d{2}$/.test(actor.dob)) 
            {
                alert("Please enter a valid date of birth (YYYY-MM-DD) for all actors.");
                return;
            }
        }

        try {
            setLoading(true);
            const updatedValues = { ...values, actors: actorForms };
            dispatch(addMovie(updatedValues));
            
        } catch (error) {
            alert(error);
        } finally {
            navigate("/")
            setLoading(false);
        }
    };


    return (
        <div className="container-fluid new-title">
            <form onSubmit={handleSubmit} className="new-title-form">
                <p><b>New Title</b></p>
                <div className="px-5 py-2">
                    <div className="form-group">
                        <label className="control-label">Name</label>
                        <input name="name" type="text" className="form-control form-control-sm" onChange={handleChange} placeholder='Movie title' required />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Plot</label>
                        <textarea name="plot" className="form-control form-control-sm" onChange={handleChange} placeholder='Story Plot' required />
                    </div>
                    <div className="form-group">
                        <label>Release Year</label>
                        <input name="releaseYear" type="text" className="form-control form-control-sm" onChange={handleChange} placeholder='2024' required/>
                    </div>
                    <div className="form-group">
                        <label>Poster</label>
                        <input name="poster" type="text" className="form-control form-control-sm" onChange={handleChange} placeholder='http images' required/>
                    </div>
                </div>

                <p><b>Actors</b></p>
                {actorForms.map((actor, index) => (
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
                                placeholder='Actor name'
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
                                placeholder='Date of Birth (YYYY-MM-DD)'
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
                    </div>
                ))}
                <button type="button" onClick={handleAddActorForm} className="btn btn-dark btn-sm m-3 mt-3">Add Another Actor</button>

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
                        <button type="submit" className="btn btn-primary">Add</button> 
                        :
                        <ButtonSpinner buttonName={"Adding"} />
                    }
                    <a className="btn btn-link" href="/movie-list">Cancel</a>
                </div>
            </form>
        </div>
    );
};

export default WithAuth(AddMovie);
