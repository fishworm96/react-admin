import { RouteObject } from "@/routes/interface";
import lazyLoad from "../utils/lazyLoad";

const homeRouter: RouteObject = {
	path: "home",
	element: lazyLoad(() => import("@/views/home")),
	meta: {
		requireAuth: true,
		title: "首页"
	}
};

export default homeRouter;
