import Home from "@/views/home";
import Login from "@/views/login";
import LayoutIndex from "@/views/layout";
import { createBrowserRouter, Navigate } from "react-router-dom";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/login" />
	},
	{
		path: "/login",
		element: <Login />
	},
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home/index",
				element: <Home />
			}
		]
	}
]);

export default router;
