import { HOME_URL } from "@/config/config";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const MoreButton = (props: any) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const closeMultipleTab = (tabPath?: string) => {
		const handleTabsList = props.tabsList.filter((item: Menu.MenuOptions) => {
			return item.path === tabPath || item.path === HOME_URL;
		});
		props.setTabsList(handleTabsList);
		tabPath ?? navigate(HOME_URL);
	};

	const items = [
		{
			key: "1",
			label: <span>{"tabs.closeCurrent"}</span>,
			onClick: () => props.delTabs(pathname)
		},
		{
			key: "2",
			label: <span>{"tabs.closeOther"}</span>,
			onClick: () => closeMultipleTab(pathname)
		},
		{
			key: "3",
			label: <span>{"tabs.closeAll"}</span>,
			onClick: () => closeMultipleTab()
		}
	];
	return (
		<Dropdown menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }} trigger={["click"]}>
			<Button className="more-button" type="primary" size="small">
				{"tabs.more"} <DownOutlined />
			</Button>
		</Dropdown>
	);
};

export default MoreButton;
