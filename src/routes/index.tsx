import { RouteObject } from "@/routes/interface";
import Login from "@/views/login";
import { createBrowserRouter, Navigate } from "react-router-dom";

// 导入所有router
const metaRouters: Record<string, { [key: string]: any }> = import.meta.glob("./modules/*.tsx");

// 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		routerArray.push(...metaRouters[item][key]);
	});
});

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/login" />
	},
	{
		path: "/login",
		element: <Login />
	},
	...routerArray
]);

export default router;
