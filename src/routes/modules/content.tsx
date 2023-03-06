import { RouteObject } from "@/routes/interface";
import LayoutIndex from "@/views/layout";
import Article from "@/views/content/article";
import Option from "@/views/content/article/component/option";

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
			},
			{
				path: "/content/article/option",
				element: <Option />
			}
		]
	}
];

export default contentRouter;
