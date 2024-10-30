import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import ButtonSpinner from "../UI/ButtonSpinner"
import { register } from "../../redux/account/userAction"
import "./Account.css"
import Logo from "../UI/Logo"

const CreateAccount = () => {
    const {isLoading, error} = useSelector(state => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [notMatch, setNotMatch] = useState('')
    const [values, setValues] = useState({
        name:"",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleChange = ({target: {name, value}}) => {
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(values.confirmPassword !== values.password) 
        {
            setNotMatch("Password doesn't Match!")
            return;
        } 
        else 
        { 
            setNotMatch('')
        }

        const resultAction = await dispatch(register(values))

        if (register.fulfilled.match(resultAction)) {
            // If registration is successful, navigate to the login page
            navigate('/auth/login');
        }
}


    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container-fluid account">
            <Logo />
            <section className="col-md-4 p-3">
                <h1 className="title mb-2">Create account</h1>
                <form onSubmit={handleSubmit} className="account-form">
                    <div className="form-group">
                        <label>Name</label>
                        <input name="name" className="form-control form-control-sm" onChange={handleChange} placeholder="First and last name" required/>
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input name="email" type="email" className="form-control form-control-sm" onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" className="form-control form-control-sm" onChange={handleChange} placeholder="atleast 8 characters" required/>
                        <div className="mt-1"> Passwords must be at least 6 characters.</div>
                    </div>
                    <div className="form-group">
                        <label>Re-enter password</label>
                        <input name="confirmPassword" type="password" className="form-control form-control-sm" onChange={handleChange} required/>
                    </div>
                    <div>
                        <span className="text-danger">{notMatch}</span>
                    </div>
                    {!isLoading ? 
                    <button type="submit" className="btn btn-block btn-sm" >Create your IMDb account</button> 
                    :
                    <ButtonSpinner buttonName={"Creating..."}/>
                    }
                    <div className="mt-3">
                        <span>Already have an account? </span>
                        <a href="/auth/login">Sign in</a>
                    </div>
                    
                </form>
            </section>
        </div>
)}

export default CreateAccount