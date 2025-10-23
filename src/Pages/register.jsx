import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Components/Layouts/AuthLayout";
import InputField from "../Components/Fragments/InputField";
import Button from "../Components/Elements/Button";
import { Link } from "react-router-dom";
import { register } from "../store/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("password tidak sama");
      return;
    }
    try {
      const success = await dispatch(register({ username, password })).unwrap();
      if (success) {
        alert("Registrasi berhasil");
        navigate("/login");
      }
    } catch (err) {
      alert(err || "Registrasi gagal");
    }
  };

  return (
    <AuthLayout
      title="DAFTAR"
      subtitle="Selamat Datang!"
      background="bg-[url(/src/assets/image/bgregister.jpg)]"
    >
      <form onSubmit={handleRegister} className="flex flex-col space-y-4">
        <InputField
          label="Username"
          id="username"
          type="text"
          placeholder="Masukan username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Password"
          id="password"
          type="password"
          placeholder="Masukan password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputField
          label="Password"
          id="confirmPassword"
          type="password"
          placeholder="Konfirmasi password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-start">
          <p className="text-[#C1C2C4]">
            Sudah Punya Akun?{" "}
            <Link to="/login" className="font-bold text-white hover:underline">
              Login
            </Link>
          </p>
        </div>
        <div className="flex flex-col">
          <Button type="submit" variant="primary">
            {isLoading ? "Loading..." : "Daftar"}
          </Button>
          <div className="flex items-center justify-center gap-2">
            <p className="text-center text-sm text-[#C1C2C4]">Atau</p>
          </div>
          <Button type="button" variant="secondary">
            <img
              src="/src/assets/image/google.png"
              className="w-5 h-5"
              alt="Google icon"
            />
            <p>Masuk dengan Google</p>
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
