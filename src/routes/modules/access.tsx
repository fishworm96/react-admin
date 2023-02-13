import { RouteObject } from "@/routes/interface";
import Menu from "@/views/access/menu";
import LayoutIndex from "@/views/layout";

const accessRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/access/menu",
				element: <Menu />,
				meta: {
					requiresAuth: false,
					title: "登录页",
					key: "login"
				}
			}
		]
	}
];

export default accessRouter;
