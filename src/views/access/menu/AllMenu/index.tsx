import { MenuState } from "@/redux/interface";
import { Table } from "antd";
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
		key: "id",
		width: "30%"
	}
];

const AllMenu: React.FC<MenuState> = ({ menuList }: MenuState) => {
	console.log(menuList);
	return (
		<>
			<Table columns={columns} dataSource={menuList} />
		</>
	);
};

const mapStateToProps = (state: MenuState) => state.menuList;
export default connect(mapStateToProps)(AllMenu);
