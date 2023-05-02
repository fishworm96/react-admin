import Error401 from "@/components/Error/401";
import Error404 from "@/components/Error/404";
import { RouteObject } from "@/routes/interface";

const homeRouter: Array<RouteObject> = [
	{
		path: "401",
		element: <Error401 />,
		meta: {
			requireAuth: false
		}
	},
	{
		path: "*",
		element: <Error404 />,
		meta: {
			requireAuth: false
		}
	}
];

export default homeRouter;
