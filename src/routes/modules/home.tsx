import { RouteObject } from "@/routes/interface";
import Home from "@/views/home";

const homeRouter: RouteObject = {
	path: "home",
	element: <Home />,
	meta: {
		requireAuth: true
	}
};

export default homeRouter;
