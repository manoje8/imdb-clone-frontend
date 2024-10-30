import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/account/userAction";
import ButtonSpinner from "../UI/ButtonSpinner";
import "./Account.css"
import Logo from "../UI/Logo";


const ForgotPassword = () => {
    const {isLoading, error} = useSelector(state => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('');

    const handleChange = ({target: {value}}) => {
        setEmail(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const resultAction = await dispatch(forgotPassword(email))

        if (forgotPassword.fulfilled.match(resultAction)) {
            // If registration is successful, navigate to the login page
            navigate('/auth/login');
        }
    }

    if (isLoading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (error) {
        return <div className="text-center mt-5">Error: {error}</div>;
    }

    return (
        <div className="container-fluid account">
            <Logo />
            <section className="col-md-4 p-3">
                <h1 className="title mb-3">Password assistance </h1>
                <span>Enter the email address associated with your IMDb account. </span>
                <form onSubmit={handleSubmit} className="account-form mt-3">
                    <div className="form-group">
                        <label> Email</label>
                        <input type="email" className="form-control form-control-sm" placeholder="Registered email address" onChange={handleChange} required/>
                    </div>
                    
                    {!isLoading ? 
                    <button type="submit" className="btn btn-block btn-sm">Continue</button> 
                    :
                    <ButtonSpinner buttonName={"Sending password reset link"}/>
                    }
                    
                    <div className="mt-3">
                        <a href="/auth/login">Back to Login</a>
                    </div>
                </form>
            </section>
        </div>
)}

export default ForgotPassword