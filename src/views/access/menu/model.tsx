import { FormList } from "#/form";
import { INPUT_REQUIRED, MENU_STATUS, SELECT_REQUIRED, STYLE_WIDTH } from "@/utils/constants";
import type { ChangeEvent } from "react";
import { CascadedOptions } from ".";
import Icon from "./component/Icon";
import type { Option } from "./index";

export interface TableColumns {
	id: number;
	key: string;
	title: string;
	type: number;
	module_id: number;
	path: string;
	icon: string;
	children?: TableColumns[];
	is_show: boolean;
}

interface CreateList {
	displayRender: (labels: string[]) => string;
	options: CascadedOptions[];
	changeInputType: (e: ChangeEvent<HTMLInputElement>) => void;
	handlerCascaderOnChange: (value: string[], selectedOptions: Option[]) => void;
}

export const tableColumns = (
	optionRender: ITableOptions<TableColumns>,
	optionStats: (value: boolean, record: TableColumns) => JSX.Element
) => {
	return [
		{
			title: "名称",
			dataIndex: "title"
		},
		{
			title: "菜单等级",
			dataIndex: "type"
		},
		{
			title: "路径",
			dataIndex: "path"
		},
		{
			title: "图标",
			dataIndex: "icon"
		},
		{
			title: "状态",
			dataIndex: "is_show",
			render: (value: boolean, record: TableColumns) => optionStats(value, record)
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

export const createList = ({ displayRender, options, changeInputType, handlerCascaderOnChange }: CreateList): FormList[] => [
	{
		label: "路由名称",
		name: "title",
		rules: INPUT_REQUIRED,
		component: "Input",
		componentProps: {
			style: STYLE_WIDTH
		}
	},
	{
		label: "路由路径",
		name: "path",
		rules: INPUT_REQUIRED,
		component: "Input",
		componentProps: {
			style: STYLE_WIDTH
		}
	},
	{
		label: "菜单等级",
		name: "type",
		rules: INPUT_REQUIRED,
		component: "Input",
		componentProps: {
			min: 1,
			style: STYLE_WIDTH,
			onChange: changeInputType
		}
	},
	{
		label: "图标",
		name: "icon",
		rules: SELECT_REQUIRED,
		component: "Select",
		componentProps: {
			style: STYLE_WIDTH
		},
		children: Icon
	},
	{
		label: "父节点名称",
		name: "parent_name",
		rules: INPUT_REQUIRED,
		component: "Cascader",
		componentProps: {
			style: STYLE_WIDTH,
			options,
			changeOnSelect: true,
			maxTagCount: "responsive",
			displayRender: displayRender,
			onChange: handlerCascaderOnChange
		}
	},
	{
		label: "状态",
		name: "is_show",
		rules: INPUT_REQUIRED,
		component: "Select",
		componentProps: {
			style: STYLE_WIDTH,
			options: MENU_STATUS
		}
	},
	{
		label: " ",
		name: "module_id",
		component: "customize",
		render: () => <div></div>
	}
];
