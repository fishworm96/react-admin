import { RouteObject } from "@/routes/interface";
import Menu from "@/views/access/menu";

const accessRouter: RouteObject = {
	path: "access",
	children: [
		{
			path: "menu",
			element: <Menu />
		}
	]
};

export default accessRouter;
