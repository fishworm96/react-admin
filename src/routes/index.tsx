import Login from "@/views/login";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/login" />
	},
	{
		path: "/login",
		element: <Login />
	}
]);

export default router;
