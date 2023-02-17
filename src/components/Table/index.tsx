import { TableColumns } from "@/views/access/menu/model";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";

interface Props {
	columns: ColumnsType<TableColumns>;
	dataSource: TableColumns[];
}

const BasicTable: React.FC<Props> = (props: Props) => {
	return <Table {...props} />;
};

export default BasicTable;
