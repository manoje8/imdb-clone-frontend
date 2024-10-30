import { Route, Routes } from "react-router-dom"
import App from "./App"
import Home from "./components/pages/Home"
import Error404 from "./components/UI/Error404"
import CreateAccount from "./components/account/CreateAccount"
import SignInRegister from "./components/account/SignInRegister"
import ForgotPassword from "./components/account/ForgotPassword"
import ResetPassword from "./components/account/ResetPassword"
import MovieList from "./components/pages/MovieList"
import AddMovie from "./components/pages/AddMovie"
import MovieDetails from "./components/details/MovieDetails"
import ActorDetails from "./components/details/ActorDetails"
import ProducerDetails from "./components/details/ProducerDetails"
import UpdateMovie from "./components/pages/UpdateMovie"

const AppRoutes = () => (
    <App>
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/auth/login" element= {<SignInRegister />} />
            <Route path="/auth/create" element= {<CreateAccount />}/>
            <Route path="/auth/forgot-password" element= {<ForgotPassword />}/>
            <Route path="/auth/reset-password" element= {<ResetPassword />}/>
            <Route path="/add-movie" element={<AddMovie />} />
            <Route path="/update-movie/:id" element={<UpdateMovie />} />
            <Route path="/movie-list" element={<MovieList />} />
            <Route path="/movies-details" element={<MovieDetails />} />
            <Route path="/actor-details" element={<ActorDetails />} />
            <Route path="/producer-details" element={<ProducerDetails />} />
            <Route path="*" element={<Error404 />}/>
        </Routes>
    </App>
)

export default AppRoutes