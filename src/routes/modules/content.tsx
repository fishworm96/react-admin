import { RouteObject } from "@/routes/interface";
import lazyLoad from "../utils/lazyLoad";

const contentRouter: RouteObject = {
	path: "content",
	children: [
		{
			path: "article",
			children: [
				{
					path: "",
					element: lazyLoad(() => import("@/views/content/article")),
					meta: {
						requireAuth: true
					}
				},
				{
					path: "option",
					element: lazyLoad(() => import("@/views/content/article/component/option")),
					meta: {
						requireAuth: true,
						title: "文章编辑"
					}
				}
			]
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
