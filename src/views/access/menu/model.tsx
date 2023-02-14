export const tableColumns = (optionRender: ITableOptions<object>): ITableColumn => {
	return [
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
			render: (value: unknown, record: object) => optionRender(value, record)
		}
	];
};
