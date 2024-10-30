import { createSlice } from "@reduxjs/toolkit";
import { addMovie, deleteMovie, fetchActorById, fetchMovieById, fetchMovies, fetchProducerById, updateMovie } from "./movieAction";


const initialState = {
    data: [],
    isLoading: null,
    error: null,
    movieInfoById: [],
    actorDetails: [],
    producerDetails: []
}

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovieId: (state, action) => {
            localStorage.setItem("movieId", action.payload)

        },
        setActorId: (state, action) => {
            localStorage.setItem("actorId", action.payload)
        },
        setProducerId: (state, action) => {
            localStorage.setItem("producerId", action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Todos
            .addCase(fetchMovies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.isLoading = false;

                state.data = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            // Add Movie
            .addCase(addMovie.fulfilled, (state, action) => {
                state.data.push(action.payload)
            })
            .addCase(addMovie.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Fetch Movie by ID
            .addCase(fetchMovieById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMovieById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movieInfoById = action.payload;
            })
            .addCase(fetchMovieById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

             // Fetch actor by ID
             .addCase(fetchActorById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchActorById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.actorDetails = action.payload;
            })
            .addCase(fetchActorById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

             // Fetch producer by ID
             .addCase(fetchProducerById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducerById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.producerDetails = action.payload;
            })
            .addCase(fetchProducerById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // Edit Todo
            .addCase(updateMovie.fulfilled, (state, action) => {
                // const { todoId, updateNote } = action.payload;
                // state.notes = state.notes.map(note => note._id === todoId ? updateNote : note)
            })
            .addCase(updateMovie.rejected, (state, action) => {
                state.error = action.payload;
            })

            // Delete todo
            .addCase(deleteMovie.fulfilled, (state, action) => {
                console.log(action.payload);
                
                // state.data = state.data.filter(movie => movie._id !== action.payload)
            })
            .addCase(deleteMovie.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
})

export const {setMovieId, setActorId, setProducerId} = movieSlice.actions

export default movieSlice.reducer