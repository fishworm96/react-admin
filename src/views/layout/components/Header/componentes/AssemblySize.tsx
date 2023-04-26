import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setAssemblySize } from "@/redux/modules/global/globalSlice";
import { Dropdown, Menu } from "antd";

export const AssemblySize = () => {
	const assemblySize = useAppSelector(state => state.global.assemblySize);
	const dispatch = useAppDispatch();

	// 切换组件大小
	const onClick = (e: MenuInfo) => {
		dispatch(setAssemblySize(e.key));
	};

	const menu = (
		<Menu
			items={[
				{
					key: "middle",
					disabled: assemblySize === "middle",
					label: <span>默认</span>,
					onClick
				},
				{
					disabled: assemblySize === "large",
					key: "large",
					label: <span>大型</span>,
					onClick
				},
				{
					disabled: assemblySize === "small",
					key: "small",
					label: <span>小型</span>,
					onClick
				}
			]}
		/>
	);
	return (
		<Dropdown overlay={menu} placement="bottom" trigger={["click"]} arrow={true}>
			<i className="icon-style iconfont icon-contentright"></i>
		</Dropdown>
	);
};
