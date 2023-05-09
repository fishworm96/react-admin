import { FormList } from "#/form";
import { INPUT_REQUIRED } from "@/utils/constants";
import { STYLE_WIDTH } from "@/utils/constants";
import { Tag } from "antd";

export interface TagColumns {
	key: number;
	name: string;
}

export const tagColumns = (optionRender: ITableOptions<TagColumns>) => {
	return [
		{
			title: "标签名",
			dataIndex: "name",
			width: "50%",
			render: (_: unknown, { name }: TagColumns) => (
				<>
					{(() => {
						let color = name.length > 5 ? "blue" : "green";
						if (name === "loser") {
							color = "volcano";
						}
						return <Tag color={color}>{name.toUpperCase()}</Tag>;
					})()}
				</>
			)
		},
		{
			title: "操作",
			dataIndex: "button",
			width: "50%",
			render: (value: unknown, record: TagColumns) => optionRender(value, record)
		}
	];
};

export const createList = (): FormList[] => [
	{
		label: "标签名",
		name: "name",
		rules: INPUT_REQUIRED,
		component: "Input",
		componentProps: {
			style: STYLE_WIDTH
		}
	},
	{
		label: " ",
		name: "key",
		component: "customize",
		render: () => <div></div>
	}
];
