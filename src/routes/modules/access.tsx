import { RouteObject } from "@/routes/interface";
import lazyLoad from "../utils/lazyLoad";

const accessRouter: RouteObject = {
	path: "access",
	children: [
		{
			path: "menu",
			element: lazyLoad(() => import("@/views/access/menu")),
			meta: {
				requireAuth: true
			}
		}
	]
};
export default accessRouter;
