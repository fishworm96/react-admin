import { RouteObject } from "@/routes/interface";
import AddMenu from "@/views/access/menu/AddMenu";
import AllMenu from "@/views/access/menu/AllMenu";
import LayoutIndex from "@/views/layout";

const accessRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/access/menu/list",
				element: <AllMenu />,
				meta: {
					requiresAuth: false,
					title: "登录页",
					key: "login"
				}
			},
			{
				path: "/access/menu/add",
				element: <AddMenu />,
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
