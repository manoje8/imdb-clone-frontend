import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./account/userSlice";
import movieSlice from "./movie/movieSlice"

const rootReducer = combineReducers({
    users: userSlice,
    movies: movieSlice
})

export default rootReducer