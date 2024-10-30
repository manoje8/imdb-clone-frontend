import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ButtonSpinner from "../UI/ButtonSpinner";
import { login } from "../../redux/account/userAction";
import "./Account.css"
import Logo from "../UI/Logo";


const SignInRegister = () => {
    const {isLoading, error} = useSelector(state => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const handleChange = ({target: {name, value}}) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const resultAction = await dispatch(login(values))

        if (login.fulfilled.match(resultAction)) 
        {
            navigate('/');

        }
    }

    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
    <div className="container-fluid account">
        <Logo />
        <section className="col-md-4 p-4">
            <h1 className="title mb-3">Sign in</h1>
            <form onSubmit={handleSubmit} className="account-form">
                <div className="form-group">
                    <label>Email address</label>
                    <input name="email" type="email" className="form-control form-control-sm" onChange={handleChange} required/>
                </div>
                <div className="form-group">
                    <span className="sign-in-password">
                        <label>Password</label>
                        <label><a href="/auth/forgot-password">Forgot password?</a></label>
                    </span>
                    <input name="password" type="password" className="form-control form-control-sm" onChange={handleChange} required/>
                </div>
                {
                    isLoading ? <ButtonSpinner buttonName={"Sign in....."}/> : 
                    <button type="submit" className="btn btn-block btn-sm">Sign in</button>
                }
                <hr />
                <p className="new-account mt-3">
                    <a className="btn btn-sm btn-block" href="/auth/create">New Account</a>
                </p>
            </form>
        </section>
    </div>
)}

export default SignInRegister