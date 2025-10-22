import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../lib/axios";
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/movies");
      return response.data;
    } catch (err) {
      const message = err.response.data.message || err.message;
      return rejectWithValue(message);
    }
  }
);
export const addMovie = createAsyncThunk(
  "movies/addMovie",
  async (newMovie, { dispatch, rejectWithValue }) => {
    try {
      await apiClient.post("/movies", newMovie);
      dispatch(fetchMovies());
    } catch (err) {
      const message = err.response.data.message || err.message;
      return rejectWithValue(message);
    }
  }
);
export const editMovie = createAsyncThunk(
  "movies/editMovie",
  async ({ movieId, updateData }, { dispatch, rejectWithValue }) => {
    try {
      await apiClient.put(`/movies/${movieId}`, updateData);
      dispatch(fetchMovies());
      return { movieId, updateData };
    } catch (err) {
      const message = err.response.data.message || err.message;
      return rejectWithValue(message);
    }
  }
);
export const deleteMovie = createAsyncThunk(
  "movies/deleteMovie",
  async (movieId, { dispatch, rejectWithValue }) => {
    try {
      await apiClient.delete(`/movies/${movieId}`);
      dispatch(fetchMovies());
      return movieId;
    } catch {
      const message = err.response.data.message || err.message;
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  movies: [],
  isLoading: false,
  error: null,
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchMovies.pending, (state)=> {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchMovies.fulfilled, (state, action) => {
            state.isLoading = false;
            state.movies = action.payload;
        })
        .addCase(fetchMovies.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload;
        })
        .addMatcher((action)=> 
           action.type.endsWith("/pending") && action.type.startsWith("movies/"),
        (state) => {
            state.isLoading = true;
            state.error = null;
        }
        )
        .addMatcher((action) => 
        action.type.endsWith("/fulfilled") && action.type.startsWith("movies/") && !action.type.includes("fetchMovies"),
        (state) => {
            
        }
        )
        .addMatcher((action) => 
        action.type.endsWith("/rejected") && action.type.startsWith("movies/"),
        (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        }
        )
    }
})

export default movieSlice.reducer;