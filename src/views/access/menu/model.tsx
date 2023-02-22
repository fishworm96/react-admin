export interface TableColumns {
	id?: number;
	key: string;
	title: string;
	type: number;
	module_id: number;
	path: string;
	icon: string;
	children?: TableColumns[];
}

export const tableColumns = (optionRender: ITableOptions<TableColumns>) => {
	return [
		{
			title: "名称",
			dataIndex: "title",
			key: "title"
		},
		{
			title: "菜单等级",
			dataIndex: "type",
			key: "type"
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
			dataIndex: "button",
			key: "button",
			width: "30%",
			render: (value: unknown, record: TableColumns) => optionRender(value, record)
		}
	];
};
