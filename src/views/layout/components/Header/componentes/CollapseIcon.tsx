import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateCollapse } from "@/redux/modules/menu/menuSlice";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

export const CollapseIcon = () => {
	const isCollapse = useAppSelector(state => state.menu.isCollapse);
	const dispatch = useAppDispatch();
	return (
		<div
			className="collapsed"
			onClick={() => {
				dispatch(updateCollapse(!isCollapse));
			}}
		>
			{isCollapse ? (
				<MenuUnfoldOutlined id="isCollapse"></MenuUnfoldOutlined>
			) : (
				<MenuFoldOutlined id="isCollapse"></MenuFoldOutlined>
			)}
		</div>
	);
};
