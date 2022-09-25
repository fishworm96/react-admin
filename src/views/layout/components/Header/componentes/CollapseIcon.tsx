import { updateCollapse } from "@/redux/modules/menu/action";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

const CollapseIcon = (props: any) => {
	const { isCollapse, updateCollapse } = props;

	return (
		<div
			className="collapsed"
			onClick={() => {
				updateCollapse(!isCollapse);
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

const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = { updateCollapse };
export default connect(mapStateToProps, mapDispatchToProps)(CollapseIcon);
