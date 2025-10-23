import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../../lib/axios";
import bcrypt from "bcryptjs";

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const user = await apiClient.get(`/users`, { params: { username } });
      if (user.data.length === 0) {
        throw new Error("User not found");
      }
      const foundUser = user.data[0];
      const isPasswordMatch = bcrypt.compareSync(password, foundUser.password);
      if (isPasswordMatch) {
        const fakeToken = `fake-token-for ${foundUser.id}`;
        localStorage.setItem("user", JSON.stringify(foundUser));
        localStorage.setItem("token", fakeToken);
        return { user: foundUser, token: fakeToken, message: "Login berhasil" };
      } else {
        throw new Error("Password salah");
      }
    } catch (err) {
      const errorMessage = err.message;
      return rejectWithValue(errorMessage);
    }
  }
);
export const register = createAsyncThunk(
  "auth/register",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const userData = { username, password: hashedPassword };
      await apiClient.post("/users", userData);
      return { message: "Registrasi berhasil" };
    } catch (err) {
      const errorMessage = err.response.data.message || err.message;
      return rejectWithValue(errorMessage);
    }
  }
);
export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  return { user: null, token: null, message: "Logout berhasil" };
};
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isLoading: false,
  error: null,
  message: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (bulder) => {
    bulder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default authSlice.reducer;
