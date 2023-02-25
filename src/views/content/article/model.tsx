export interface PostColumns {
	id?: number;
	title: string;
	key: string;
	author_name: string;
	tag: string[];
	introduction: string;
}

export const postColumns = (optionRender: ITableOptions<PostColumns>) => {
	return [
		{
			title: "标题",
			dataIndex: "title"
		},
		{
			title: "作者名称",
			dataIndex: "author_name"
		},
		{
			title: "标签",
			dataIndex: "tag"
		},
		{
			title: "简述",
			dataIndex: "introduction"
		},
		{
			title: "操作",
			dataIndex: "button",
			width: "30%",
			render: (value: unknown, record: PostColumns) => optionRender(value, record)
		}
	];
};
