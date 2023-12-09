import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import FeedScreen from "./screens/FeedScreen/FeedScreen";
import { useSelector } from "react-redux";

function App() {
  const state_token = useSelector((state) => state.auth.token);

  const token = localStorage.getItem("@jwt-token");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginScreen />,
    },
    {
      path: "/register",
      element: <RegisterScreen />,
    },
    {
      path: "/feed",
      element: token ? <FeedScreen /> : <Navigate to="/" replace />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
