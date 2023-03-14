import Error404 from "@/components/Error/404";
import { RouteObject } from "@/routes/interface";
import LayoutIndex from "@/views/layout";
import Login from "@/views/login";
import { createBrowserRouter, Navigate } from "react-router-dom";
import accessRouter from "./modules/access";
import contentRouter from "./modules/content";
import homeRouter from "./modules/home";

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
		element: <Navigate to="/login" />,
		errorElement: <Error404 />
	},
	{
		path: "/login",
		element: <Login />
	},
	{
		path: "/",
		element: <LayoutIndex />,
		children: [homeRouter, accessRouter, contentRouter]
	},
	...routerArray
];

export default createBrowserRouter(router);
