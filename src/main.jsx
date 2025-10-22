import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./Pages/login.jsx";
import RegisterPage from "./Pages/register.jsx";
import HomePage from "./Pages/home.jsx";
import ProtectedRoute from "./Components/Fragments/Routes/ProtectedRoute.jsx";
import PublicRoute from "./Components/Fragments/Routes/PublicRoute.jsx";
import MainLayout from "./Components/Layouts/MainLayout.jsx";
import EditMoviePage from "./Pages/editMovie.jsx";
import { Provider } from "react-redux";
import { store } from "./store/redux/store.js";


const router = createBrowserRouter([
 {
  path:"/",
  element: <MainLayout/>,
  children:[
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/editmovie",
      element: (
        <ProtectedRoute>
          <EditMoviePage />
        </ProtectedRoute>
      ),
    }
  ]
},
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
