import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, login, register, resetPassword } from "./userAction";

const initialState = {
    token: null,
    error: null,
    isLoading: null,
}

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: { 
        logout: (state) => {
            localStorage.clear()
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle register
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            //  Handle Login
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                const {accessToken, name} = action.payload

                localStorage.setItem('token', accessToken)
                localStorage.setItem('name', name)

                state.isLoading = false;
                state.token = accessToken
                state.user = name
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })

            // Handle forgot password
            .addCase(forgotPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(forgotPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Handle reset password
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    } 
})


export const { logout } = userSlice.actions
export default userSlice.reducer;