import LayoutIndex from "@/views/layout";
import { RouteObject } from "@/routes/interface";
import Home from "@/views/home";

const homeRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/home/index",
				element: <Home />,
				meta: {
					requiresAuth: false,
					title: "登录页",
					key: "login"
				}
			}
		]
	}
];

export default homeRouter;
