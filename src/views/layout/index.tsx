// import { getAuthorButtons } from "@/api/modules/login";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateCollapse } from "@/redux/modules/menu/menuSlice";
import { Layout } from "antd";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { LayoutFooter } from "./components/Footer";
import LayoutHeader from "./components/Header";
import LayoutMenu from "./components/Menu";
import "./index.less";

const LayoutIndex = () => {
	const isCollapse = useAppSelector(state => state.menu.isCollapse);
	const dispatch = useAppDispatch();
	const { Sider, Content } = Layout;
	// 获取按钮权限列表
	// const getAuthButtonsList = async () => {
	// 	const { data } = await getAuthorButtons();
	// 	console.log(data);
	// 	setAuthButtons(data!);
	// };

	// 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			return (() => {
				let screenWidth = document.body.clientWidth;
				if (!isCollapse && screenWidth < 1200) dispatch(updateCollapse(true));
				if (!isCollapse && screenWidth > 1200) dispatch(updateCollapse(false));
			})();
		};
	};

	useEffect(() => {
		listeningWindow();
		// getAuthButtonsList();
	}, []);

	return (
		// 这里不用 layout 组件原因是切换页面时样式会先错乱然后再正常显示，造成页面闪屏效果
		<section className="container">
			<Sider collapsible trigger={null} collapsed={isCollapse} width={220} theme="dark">
				<LayoutMenu></LayoutMenu>
			</Sider>
			<Layout>
				<LayoutHeader></LayoutHeader>
				{/* <LayoutTabls></LayoutTabls> */}
				<Content>
					<Outlet></Outlet>
				</Content>
				<LayoutFooter></LayoutFooter>
			</Layout>
		</section>
	);
};

export default LayoutIndex;
