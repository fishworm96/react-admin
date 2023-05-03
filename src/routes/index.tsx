import Error404 from "@/components/Error/404";
import { RouteObject } from "@/routes/interface";
import LayoutIndex from "@/views/layout";
import Login from "@/views/login";
import { Navigate, useRoutes } from "react-router-dom";

// 导入所有router
const metaRouters: Record<string, { [key: string]: any }> = import.meta.glob("./modules/*.tsx", { eager: true });
// 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
	Object.keys(metaRouters[item]).forEach((key: any) => {
		Array.isArray(metaRouters[item][key])
			? routerArray.push(...metaRouters[item][key])
			: routerArray.push(metaRouters[item][key]);
	});
});

export let router: RouteObject[] = [
	{
		path: "",
		element: <Navigate to="admin" />,
		errorElement: <Error404 />
	},
	{
		path: "admin",
		element: <Login />,
		errorElement: <Error404 />
	},
	{
		path: "admin",
		element: <LayoutIndex />,
		children: [...routerArray]
	},
	{
		path: "*",
		element: <Error404 />
	}
];

const Router = () => {
	const routes = useRoutes(router);
	return routes;
};

export default Router;
