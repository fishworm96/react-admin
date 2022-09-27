import { getAuthorButtons } from "@/api/modules/login";
import { setAuthButtons } from "@/redux/modules/auth/actions";
import Layout from "antd/lib/layout";
import layout from "antd/lib/layout";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom";
import LayoutFooter from "./components/Footer";
import LayoutHeader from "./components/Header";
import LayoutMenu from "./components/Menu";
import "./index.less";

const LayoutIndex = (props: any) => {
	const { Sider, Content } = layout;
	const { isCollapse, updateCollapse } = props;

	// 获取按钮权限列表
	const getAuthButtonsList = async () => {
		const { data } = await getAuthorButtons();
		console.log(data);
		setAuthButtons(data!);
	};

	// 监听窗口大小变化
	const listeningWindow = () => {
		window.onresize = () => {
			return (() => {
				let screenWidth = document.body.clientWidth;
				if (!isCollapse && screenWidth < 1200) updateCollapse(true);
				if (!isCollapse && screenWidth > 1200) updateCollapse(false);
			})();
		};
	};

	useEffect(() => {
		listeningWindow();
		getAuthButtonsList();
	});

	return (
		// 这里不用 layout 组件原因是切换页面时样式会先错乱然后再正常显示，造成页面闪屏效果
		<section className="container">
			<Sider trigger={null} collapsed={props.isCollapse} width={220} theme="dark">
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

const mapStateToProps = (state: any) => state.menu;
export default connect(mapStateToProps)(LayoutIndex);
