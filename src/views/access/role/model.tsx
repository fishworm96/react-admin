import { INPUT_REQUIRED } from "@/utils/config";
import { STYLE_WIDTH } from "@/utils/constants";
import { DataNode, TreeProps } from "antd/lib/tree";

export interface RoleColumns {
	key: number;
	title: string;
	description: string;
}

export const roleColumns = (optionRender: ITableOptions<RoleColumns>) => {
	return [
		{
			title: "角色",
			dataIndex: "title"
			// key: "title"
		},
		{
			title: "描述",
			dataIndex: "description"
			// key: "type"
		},
		{
			title: "操作",
			dataIndex: "button",
			key: "button",
			width: "30%",
			render: (value: unknown, record: RoleColumns) => optionRender(value, record)
		}
	];
};

export const createRoleAccessList = ({
	treeData,
	treeKey,
	expandedKeys,
	onCheck,
	onExpand
}: {
	treeData: DataNode[];
	treeKey: string[];
	expandedKeys: string[];
	onCheck: TreeProps["onCheck"];
	onExpand: (expandedKeysValue: string[]) => void;
}) => [
	{
		label: "权限修改",
		name: "role_access",
		component: "Tree",
		componentProps: {
			checkable: "checkable",
			// 默认展开指定的树节点
			expandedKeys: expandedKeys,
			// 默认选中的树节点
			// defaultSelectedKeys: ["0-0-0-0", "0-0-0-1"],
			// 默认选中复选框的树节点
			checkedKeys: treeKey,
			treeData,
			onCheck,
			onExpand
		}
	}
];

export const createList = () => [
	{
		label: "角色",
		name: "title",
		rules: INPUT_REQUIRED,
		component: "Input",
		componentProps: {
			style: STYLE_WIDTH
		}
	},
	{
		label: "描述",
		name: "description",
		rules: INPUT_REQUIRED,
		component: "Input",
		componentProps: {
			style: STYLE_WIDTH
		}
	},
	{
		label: " ",
		name: "id",
		component: "customize",
		render: () => <div></div>
	}
];
