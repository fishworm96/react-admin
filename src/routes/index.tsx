import { RouteObject } from "@/routes/interface";
import Login from "@/views/login";
import LayoutIndex from "@/views/layout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "@/views/home";
import homeRouter from "./modules/home";
import accessRouter from "./modules/access";

// 导入所有router
const metaRouters: Record<string, { [key: string]: any }> = import.meta.glob("./modules/*.tsx");

// 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

export const router = [
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
				path: "/home",
				element: <Home />,
				meta: {
					requiresAuth: false,
					title: "登录页",
					key: "login"
				}
			}
		]
	},
	...accessRouter,
	...homeRouter,
	...routerArray
];

export default createBrowserRouter(router);
