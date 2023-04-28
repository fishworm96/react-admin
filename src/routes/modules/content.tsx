import { RouteObject } from "@/routes/interface";
import Article from "@/views/content/article";
import Option from "@/views/content/article/component/option";
import Tag from "@/views/content/tag";

const contentRouter: RouteObject = {
	path: "content",
	children: [
		{
			path: "article",
			element: <Article />,
			children: [
				{
					path: "option",
					element: <Option />,
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
			element: <Tag />,
			meta: {
				requireAuth: true
			}
		}
	]
};

export default contentRouter;
