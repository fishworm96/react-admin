import { RouteObject } from "@/routes/interface";
import Home from "@/views/home";

const homeRouter: RouteObject = {
	path: "home",
	element: <Home />
};

export default homeRouter;
