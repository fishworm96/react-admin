import { AxiosCanceler } from "@/api/helper/axiosCancel";
import { HOME_URL } from "@/config/config";
import { store } from "@/redux";
import { searchRoute } from "@/utils/util";
import { Navigate, useLocation } from "react-router-dom";
import { router } from "..";

const axiosCanceler = new AxiosCanceler();

const AuthRouter = ({ children }: { children: JSX.Element }) => {
	const { pathname } = useLocation();
	const path = pathname.split("/").pop() || "";
	const route = searchRoute(path, router);
	// * 在跳转路由之前，清除所有的请求
	axiosCanceler.removeAllPending();

	// * 获取 token
	const token = store.getState().global.token;
	if (token && pathname === "/admin") return <Navigate to={`${HOME_URL}`} />;
	// * 判断当前路由是否需要访问权限(不需要权限直接放行)
	if (!route.meta?.requireAuth) return children;
	// 判断是否有 token
	if (!token) return <Navigate to="/admin" />;
	// * Dynamic Router(动态路由，根据后端返回的菜单数据生成的一维数组)
	const dynamicRouter = store.getState().auth.authRouter;
	// * Static Router(静态路由，必须配置首页地址，否则不能进首页获取菜单、按钮权限等数据)，获取数据的时候会loading，所有配置首页地址也没问题
	const staticRouter = [HOME_URL, "/admin/401"];
	const routerList = dynamicRouter.concat(staticRouter);
	// * 如果访问的地址没有在路由表中重定向到403页面
	if (routerList.indexOf(pathname) === -1) return <Navigate to="/admin/401" />;

	// * 当前账号有权限返回 Router，正常访问页面
	return children;
};

export default AuthRouter;
