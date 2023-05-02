import { RouteObject } from "@/routes/interface";
import lazyLoad from "../utils/lazyLoad";

const contentRouter: RouteObject = {
	path: "content",
	children: [
		{
			path: "article",
			element: lazyLoad(() => import("@/views/content/article")),
			children: [
				{
					path: "option",
					element: lazyLoad(() => import("@/views/content/article/component/option")),
					meta: {
						requireAuth: true
					}
				}
			],
			meta: {
				requireAuth: true
			}
		},
		{
			path: "tag",
			element: lazyLoad(() => import("@/views/content/tag")),
			meta: {
				requireAuth: true
			}
		},
		{
			path: "category",
			element: lazyLoad(() => import("@/views/content/category")),
			meta: {
				requireAuth: true
			}
		}
	]
};

export default contentRouter;
