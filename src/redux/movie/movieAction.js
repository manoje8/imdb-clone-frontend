import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_API_URL = `${process.env.REACT_APP_API_URL}`;
// Thunks for async actions


// Add Movie
export const addMovie = createAsyncThunk('movie/add', async(data, {rejectWithValue}) => {
    
    try 
    {
        const response = await axios.post(`${AUTH_API_URL}/movie/add-movie`, data);
        
        return response.data

    } catch (error) 
    {
        return rejectWithValue(error.response.data.message);
    }
})


// Fetch Movies
export const fetchMovies = createAsyncThunk('movie/fetch', async(_, {rejectWithValue}) => {
    
    try 
    {
        const response = await axios.get(`${AUTH_API_URL}/movie/`);
        return response.data

    } catch (error) 
    {
        return rejectWithValue(error.response.data.message);
    }
})

// Fetch Movies By Id
export const fetchMovieById = createAsyncThunk('movie/fetchById', async(id, {rejectWithValue}) => {
    
    try 
    {
        const response = await axios.get(`${AUTH_API_URL}/movie/${id}`);
        return response.data

    } catch (error) 
    {
        return rejectWithValue(error.response.data.message);
    }
})

//Update Movie
export const updateMovie = createAsyncThunk('movie/update', async({id, values}, {rejectWithValue}) => { 

    try 
    {
        const response = await axios({
            method: 'put',
            url: `${AUTH_API_URL}/movie/update-movie/${id}`,
            data: {
                values
            }
        });
        
        return response.data

    } catch (error) 
    {
        return rejectWithValue(error.response.data.message);
    }
})

// Fetch Delete By Id
export const deleteMovie = createAsyncThunk('movie/delete', async(id, {rejectWithValue}) => {
    
    try 
    {
        const response = await axios.delete(`${AUTH_API_URL}/movie/delete/${id}`);
        return response.data

    } catch (error) 
    {
        return rejectWithValue(error.response.data.message);
    }
})

// Fetch Actor By Id
export const fetchActorById = createAsyncThunk('actor/fetchById', async(id, {rejectWithValue}) => {
    
    try 
    {
        const response = await axios.get(`${AUTH_API_URL}/actor/getActorById/${id}`);
        return response.data

    } catch (error) 
    {
        return rejectWithValue(error.response.data.message);
    }
})

// Fetch Actor By Id
export const fetchProducerById = createAsyncThunk('producer/fetchById', async(id, {rejectWithValue}) => {
    
    try 
    {
        const response = await axios.get(`${AUTH_API_URL}/producer/getProducerById/${id}`);
        return response.data

    } catch (error) 
    {
        return rejectWithValue(error.response.data.message);
    }
})