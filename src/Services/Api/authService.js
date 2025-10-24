import apiClient from "../../lib/axios";
import bcrypt from "bcryptjs";

export const login = async (username, password) => {
  try {
    const user = await apiClient.get(`/users`, { params: { username } });
    if (user.data.length === 0) {
      throw new Error("User not found");
    }
    const foundUser = user.data[0];
    const isPasswordMatch = bcrypt.compareSync(password, foundUser.password);
    if (isPasswordMatch) {
      const fakeToken = `fake-token-fot ${foundUser.id}`;
      localStorage.setItem("user", JSON.stringify(foundUser));
      localStorage.setItem("token", fakeToken);
      return true;
    } else {
      throw new Error("Password salah");
    }
  } catch (err) {
    const errorMessage = err.message;
    return errorMessage;
  }
};
export const register = async (username, password) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        const hashed = bcrypt.hashSync(password, salt);
        const userData = { username, password: hashed };
        await apiClient.post("/users", userData);
        return true
    }catch (err){
        const errorMessage = err.response.data.message || err.message;
        return errorMessage
    }
}