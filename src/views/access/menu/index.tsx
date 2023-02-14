import BasicContent from "@/components/Content";
import { MenuState } from "@/redux/interface";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React from "react";
import { connect } from "react-redux";

const columns: ColumnsType<Menu.MenuOptions> = [
	{
		title: "名称",
		dataIndex: "title",
		key: "title"
	},
	{
		title: "菜单等级",
		dataIndex: "module_id",
		key: "module_id"
	},
	{
		title: "路径",
		dataIndex: "path",
		key: "path"
	},
	{
		title: "图标",
		dataIndex: "icon",
		key: "icon"
	},
	{
		title: "操作",
		dataIndex: "",
		key: "button",
		width: "30%",
		render: () => (
			<Space wrap>
				<Button type="primary">编辑</Button>
				<Button type="primary" danger>
					删除
				</Button>
			</Space>
		)
	}
];

const Menu: React.FC<MenuState> = ({ menuList }: MenuState) => {
	// console.log(menuList);
	return (
		<BasicContent>
			<>
				<Button type="primary" icon={<PlusCircleTwoTone />}>
					新增
				</Button>
				<Table columns={columns} dataSource={menuList} />
			</>
		</BasicContent>
	);
};

const mapStateToProps = (state: MenuState) => state.menu;
export default connect(mapStateToProps)(Menu);
