import { RouteObject } from "@/routes/interface";
import Article from "@/views/content/article";
import Option from "@/views/content/article/component/option";

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
		}
	]
};

export default contentRouter;
