import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../Components/Layouts/AuthLayout";
import InputField from "../Components/Fragments/InputField";
import Button from "../Components/Elements/Button";
import { Link } from "react-router-dom";
import { login } from "../store/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginSucces = await dispatch(
        login({ username, password })
      ).unwrap();
      if (loginSucces) {
        navigate("/");
      }
    } catch (err) {
      alert(err || "Login gagal");
    }
  };
  return (
    <AuthLayout
      title="MASUK"
      subtitle="Selamat Datang Kembali!"
      background="bg-[url(/src/assets/image/bglogin.jpg)]"
    >
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
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
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between items-center text-sm gap-2 sm:gap-4 mt-2">
          <p className="text-[#C1C2C4]">
            Belum Punya Akun?{" "}
            <Link
              to="/register"
              className="font-bold text-white hover:underline"
            >
              Daftar
            </Link>
          </p>
          <a href="#" className="hover:underline">
            Lupa kata sandi?
          </a>
        </div>
        <div className="flex flex-col">
          <Button type="submit" variant="primary">
            {isLoading ? "Loading..." : "Masuk"}
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

export default LoginPage;
