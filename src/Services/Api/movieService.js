import apiClient from "../../lib/axios";
export const getAllMovies = async () => {
    try {
        const response = await apiClient.get("/movies");
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const createMovie = async (newMovie) => {
    try {
        const response = await apiClient.post("/movies", newMovie);
        return response.data;
    }catch(error){
        throw error;
    }
}
export const editMovie = async (movieId, updateData) => {
    try {
        const response = await apiClient.put(`/movies/${movieId}`, updateData);
        return response.data;
    }catch(error){
        throw error;
    }
}
export const deleteMovieById = async (movieId) => {
    try {
        const response = await apiClient.delete(`/movies/${movieId}`);
        return response.data;
    }catch(error){
        throw error;
    }
}