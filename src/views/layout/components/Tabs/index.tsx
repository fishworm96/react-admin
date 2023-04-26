import { HOME_URL } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setTabsList } from "@/redux/modules/tabs/tabsSlice";
import { routerArray } from "@/routes";
import { searchRoute } from "@/utils/util";
import { HomeFilled } from "@ant-design/icons";
import { message, Tabs } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MoreButton from "./components/MoreButton";

export const LayoutTabs = () => {
	const tabsList = useAppSelector(state => state.tabs.tabsList);
	const themeConfig = useAppSelector(state => state.global.themeConfig);
	const dispatch = useAppDispatch();
	const { TabPane } = Tabs;
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [activeValue, setActiveValue] = useState<string>(pathname);

	useEffect(() => {
		addTabs();
	}, [pathname]);

	const clickTabs = (path: string) => {
		navigate(path);
	};

	const addTabs = () => {
		const route = searchRoute(pathname, routerArray);
		let newTabsList = JSON.parse(JSON.stringify(tabsList));
		if (tabsList.every((item: any) => item.path !== route.path)) {
			newTabsList.push({ title: route.meta!.title, path: route.path });
		}
		dispatch(setTabsList(newTabsList));
		setActiveValue(pathname);
	};

	const delTabs = (tabPath?: string) => {
		if (tabPath === HOME_URL) return;
		if (pathname === tabPath) {
			tabsList.forEach((item: Menu.MenuOptions, index: number) => {
				if (item.path !== pathname) return;
				const nextTab = tabsList[index + 1] || tabsList[index - 1];
				if (!nextTab) return;
				navigate(nextTab.path);
			});
		}
		message.success("你删除了Tabs标签");
		dispatch(setTabsList(tabsList.filter((item: Menu.MenuOptions) => item.path !== tabPath)));
	};

	return (
		<>
			{!themeConfig.tabs && (
				<div className="tabs">
					<Tabs
						animated
						activeKey={activeValue}
						onChange={clickTabs}
						type="editable-card"
						onEdit={path => {
							delTabs(path as string);
						}}
					>
						{tabsList.map((item: Menu.MenuOptions) => {
							return (
								<TabPane
									key={item.path}
									tab={
										<span>
											{item.path == HOME_URL ? <HomeFilled /> : ""}
											{item.title}
										</span>
									}
									closable={item.path !== HOME_URL}
								></TabPane>
							);
						})}
					</Tabs>
					<MoreButton tabsList={tabsList} delTabs={delTabs} setTabsList={setTabsList}></MoreButton>
				</div>
			)}
		</>
	);
};
