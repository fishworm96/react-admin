import { RouteObject } from "@/routes/interface";
import Article from "@/views/content/article";
import LayoutIndex from "@/views/layout";

const contentRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		children: [
			{
				path: "/content/article",
				element: <Article />,
				meta: {
					requiresAuth: false,
					title: "登录页",
					key: "login"
				}
			}
		]
	}
];

export default contentRouter;
