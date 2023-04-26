import { RouteObject } from "@/routes/interface";
import Article from "@/views/content/article";
import Option from "@/views/content/article/component/option";
import Tag from "@/views/content/tag";

const contentRouter: RouteObject = {
	path: "content",
	children: [
		{
			path: "article",
			element: <Article />
		},
		{
			path: "article/option",
			element: <Option />
		},
		{
			path: "tag",
			element: <Tag />
		}
	]
};

export default contentRouter;
