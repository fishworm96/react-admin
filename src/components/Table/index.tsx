import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";

type Props = {
	columns: ColumnsType<Menu.MenuOptions>;
	dataSource: Menu.MenuOptions[];
};

const BasicTable: React.FC<Props> = ({ columns, dataSource }: Props) => {
	// console.log(menuList);
	return <Table columns={columns} dataSource={dataSource} />;
};

export default BasicTable;
