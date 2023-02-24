import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";

interface Props<T> {
	columns: ColumnsType<T>;
	dataSource: T[];
}

const BasicTable = <T extends {}>(props: Props<T>) => {
	return <Table<T> {...props} />;
};

export default BasicTable;
