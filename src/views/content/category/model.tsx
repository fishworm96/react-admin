import { FormList } from "#/form";
import { INPUT_REQUIRED, UPLOAD_REQUIRED } from "@/utils/config";
import { STYLE_WIDTH } from "@/utils/constants";
import { UploadOutlined } from "@ant-design/icons";
import { Button, UploadFile } from "antd";

interface CreateList {
	customRequest: ({
		file,
		fileList,
		onProgress,
		onSuccess,
		onError
	}: {
		file: File;
		fileList: UploadFile[];
		onProgress: (event: { percent: number }) => void;
		onSuccess: (body: any, file: File, xhr?: XMLHttpRequest) => void;
		onError: (event: Error | unknown, body?: any, status?: any, headers?: any) => void;
	}) => void;
	fileList: UploadFile[];
}

export interface CategoryColumns {
	key: number;
	name: string;
	image: string;
}

export const categoryColumns = (optionRender: ITableOptions<CategoryColumns>, categoryImage: ITableOptions<CategoryColumns>) => {
	return [
		{
			title: "分类名称",
			dataIndex: "name"
		},
		{
			title: "图片",
			dataIndex: "image",
			render: (value: unknown, record: CategoryColumns) => categoryImage(value, record)
		},
		{
			title: "操作",
			dataIndex: "button",
			render: (value: unknown, record: CategoryColumns) => optionRender(value, record)
		}
	];
};

export const createList = ({ customRequest, fileList }: CreateList): FormList[] => [
	{
		label: "分类名称",
		name: "name",
		rules: INPUT_REQUIRED,
		component: "Input",
		componentProps: {
			style: STYLE_WIDTH
		}
	},
	{
		label: "上传",
		name: "image",
		rules: UPLOAD_REQUIRED,
		component: "Upload",
		componentProps: {
			fileList,
			maxCount: 1,
			listType: "picture",
			customRequest
		},
		children: () => <Button icon={<UploadOutlined />}>上传图片</Button>
	},
	{
		label: " ",
		name: "key",
		component: "customize",
		render: () => <div></div>
	}
];
