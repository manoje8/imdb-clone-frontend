import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { resetPassword } from "../../redux/account/userAction"
import "./Account.css"
import Logo from "../UI/Logo"

const ResetPassword = () => {
    const {isLoading, error} = useSelector(state => state.users)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [notMatch, setNotMatch] = useState('')
    const [values, setValues] = useState({
        otp: "",
        email: "",
        newPassword: "",
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
        if(values.newPassword !== values.confirmPassword)
        {
            setNotMatch("Password doesn't match");
            return;
        }else
        {
            setNotMatch("")
        }
        
        
        const resultAction = await dispatch(resetPassword(values))

        if (resetPassword.fulfilled.match(resultAction)) 
        {
            navigate('/auth/login');
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container-fluid account">
            <Logo />
            <section className="col-md-4 p-3">
                <h1 className="title">Reset account password</h1>
                <form onSubmit={handleSubmit} className="account-form">
                    <div className="form-group">
                        <label>OTP</label>
                        <input name="otp" className="form-control form-control-sm" onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Email address</label>
                        <input name="email" type="email" className="form-control form-control-sm" onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input name="newPassword" type="password" className="form-control form-control-sm" onChange={handleChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input name="confirmPassword" type="password" className="form-control form-control-sm" onChange={handleChange} required/>
                    </div>
                    <div>
                        <span>{notMatch}</span>
                    </div>
                    <button type="submit" className="btn btn-sm btn-block" >Rest Password</button>
                </form>
            </section>
        </div>
    )
}

export default ResetPassword