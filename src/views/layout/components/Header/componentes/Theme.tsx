import { SwitchDark } from "@/components/SwitchDark";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setThemeConfig } from "@/redux/modules/global/globalSlice";
import { updateCollapse } from "@/redux/modules/menu/menuSlice";
import { FireOutlined, SettingOutlined } from "@ant-design/icons";
import { Divider, Drawer, Switch } from "antd";
import { useState } from "react";

export const Theme = () => {
	const dispatch = useAppDispatch();
	const isCollapse = useAppSelector(state => state.menu.isCollapse);
	const themeConfig = useAppSelector(state => state.global.themeConfig);
	const [visible, setVisible] = useState(false);
	const { weakOrGray, breadcrumb, tabs, footer } = themeConfig;

	const setWeakOrGray = (checked: boolean, theme: string) => {
		if (checked) return dispatch(setThemeConfig({ ...themeConfig, weakOrGray: theme }));
		dispatch(setThemeConfig({ ...themeConfig, weakOrGray: "" }));
	};

	const onChange = (checked: boolean, keyName: string) => {
		return dispatch(setThemeConfig({ ...themeConfig, [keyName]: !checked }));
	};

	return (
		<>
			<i
				className="icon-style iconfont icon-zhuti"
				onClick={() => {
					setVisible(true);
				}}
			></i>
			<Drawer
				title="布局设置"
				closable={false}
				onClose={() => {
					setVisible(false);
				}}
				open={visible}
				width={320}
			>
				{/* 全局主题 */}
				<Divider className="divider">
					<FireOutlined>全局主题</FireOutlined>
				</Divider>
				<div className="theme-item">
					<span>黑暗模式</span>
					<SwitchDark></SwitchDark>
				</div>
				<div className="theme-item">
					<span>灰色模式</span>
					<Switch
						checked={weakOrGray === "gray"}
						onChange={e => {
							setWeakOrGray(e, "gray");
						}}
					/>
				</div>
				<div className="theme-item">
					<span>色弱模式</span>
					<Switch
						checked={weakOrGray === "weak"}
						onChange={e => {
							setWeakOrGray(e, "weak");
						}}
					/>
				</div>
				<br />
				{/* 界面设置 */}
				<Divider className="divider">
					<SettingOutlined />
					界面设置
				</Divider>
				<div className="theme-item">
					<span>折叠菜单</span>
					<Switch
						checked={isCollapse}
						onChange={e => {
							dispatch(updateCollapse(e));
						}}
					/>
				</div>
				<div className="theme-item">
					<span>面包屑导航</span>
					<Switch
						checked={!breadcrumb}
						onChange={e => {
							onChange(e, "breadcrumb");
						}}
					/>
				</div>
				<div className="theme-item">
					<span>标签栏</span>
					<Switch
						checked={!tabs}
						onChange={e => {
							onChange(e, "tabs");
						}}
					/>
				</div>
				<div className="theme-item">
					<span>页脚</span>
					<Switch
						checked={!footer}
						onChange={e => {
							onChange(e, "footer");
						}}
					/>
				</div>
			</Drawer>
		</>
	);
};
