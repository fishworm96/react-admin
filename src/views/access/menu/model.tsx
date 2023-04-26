import { FormList } from "#/form";
import { INPUT_REQUIRED, SELECT_REQUIRED } from "@/utils/config";
import { STYLE_WIDTH } from "@/utils/constants";
import type { ChangeEvent } from "react";
import { CascadedOptions } from ".";
import Icon from "./component/Icon";
import type { Option } from "./index";

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

interface CreateList {
	displayRender: (labels: string[]) => string;
	options: CascadedOptions[];
	changeInputType: (e: ChangeEvent<HTMLInputElement>) => void;
	handlerCascaderOnChange: (value: string[], selectedOptions: Option[]) => void;
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
		label: " ",
		name: "module_id",
		component: "customize",
		render: () => <div></div>
	}
];
