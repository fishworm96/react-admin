import { CategoryApi } from "@/api/interface";
import { createCategory, deleteCategory, getCategoryList, updateCategory } from "@/api/modules/category";
import { CreateBtn, DeleteBtn, UpdateBtn } from "@/components/Button";
import { callbackParams } from "@/components/Button/components/DeleteBtn";
import BasicContent from "@/components/Content";
import BasicForm, { IFormFn } from "@/components/Form";
import BasicModal from "@/components/Modal";
import BasicTable from "@/components/Table";
import { ADD_TITLE, EDIT_TITLE } from "@/utils/constants";
import { Image, Space, UploadFile } from "antd";
import { useEffect, useRef, useState } from "react";
import { ZoomInOutlined } from "@ant-design/icons";

import { createList, categoryColumns, CategoryColumns } from "./model";
import { getMd5 } from "@/utils/util";
import { uploadImage } from "@/api/modules/upload";

export interface RcCustomRequestOptions {
	onProgress: (event: { percent: number }, file: File) => void; // 上传进度回调函数
	onError: (event: Error | unknown, body?: any, status?: any, headers?: any) => void; // 上传失败回调函数
	onSuccess: (body: any, file: File, xhr?: XMLHttpRequest) => void; // 上传成功回调函数
	data?: object | ((file: UploadFile, data: object) => object); // 自定义上传数据
	filename?: string; // 自定义上传文件名
	file: File; // 被上传的文件
	fileList: UploadFile[];
}

const Article = () => {
	const createFormRef = useRef<IFormFn>(null);
	const [categoryList, setCategoryList] = useState<CategoryColumns[]>([]);
	const [modalTitle, setModalTitle] = useState<string>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [categoryName, setCategoryName] = useState<{}>();
	const [image, setImage] = useState<string>("");
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	useEffect(() => {
		getCategory();
	}, []);

	useEffect(() => {
		if (image) {
			setFileList([{ uid: "1", name: "图片", status: "done", url: image }]);
		}
	}, [image]);

	const formatData = (item: CategoryApi.Category[]): CategoryColumns[] => {
		return item.map(item => {
			const { id, name, image } = item;
			const Data: CategoryColumns = { key: id, name, image };
			return Data;
		});
	};

	// 获取分类
	const getCategory = async () => {
		try {
			const { data } = await getCategoryList();
			setCategoryList(formatData(data));
		} catch (err) {
			console.error(err);
			return;
		}
	};

	// 创建按钮
	const onCreate = () => {
		setModalTitle(ADD_TITLE);
		createFormRef.current?.handleReset();
		setIsModalOpen(true);
		setFileList([]);
	};

	// 更新按钮
	const onUpdate = (category: CategoryColumns) => {
		setModalTitle(EDIT_TITLE);
		setIsModalOpen(true);
		if (category) {
			setCategoryName(category);
			setImage(category.image);
		}
	};

	// 删除分类
	const onDelete = async ({ isOk, id }: callbackParams<number>) => {
		if (isOk && id) {
			await deleteCategory(id);
			setCategoryList(categoryList.filter(item => item.key !== id));
		}
	};

	const handleOk = () => {
		createFormRef.current?.handleSubmit();
	};

	// 创建或更新菜单
	const handleCreate = async (value: CategoryColumns) => {
		try {
			if (value.key) {
				await updateCategory({ id: +value.key, name: value.name, image: value.image });
				setCategoryList(categoryList.map(item => (item.key === value.key ? { ...value, image } : item)));
				return;
			}
			await createCategory({ name: value.name, image });
			getCategory();
		} finally {
			setImage("");
			setIsModalOpen(false);
		}
	};

	// 模态框取消按钮
	const OnCancelBtn = () => {
		setIsModalOpen(false);
		setCategoryName({});
		setImage("");
	};

	const customRequest = async ({ file, onProgress, onSuccess, onError }: RcCustomRequestOptions) => {
		const md5 = await getMd5(file);
		const form = new FormData();
		form.append("image", file);
		form.append("md5", md5);
		// 将onProgress回调函数转换成onUploadProgress回调函数
		const onUploadProgress = (progressEvent: ProgressEvent) => {
			const percentCompleted = +Math.round((progressEvent.loaded / progressEvent.total) * 100).toFixed(2);
			onProgress({ percent: percentCompleted }, file);
		};

		try {
			// 使用uploadImage函数上传文件，并传入onUploadProgress回调函数
			const { data } = await uploadImage(form, onUploadProgress);
			setImage(data.url);
			onSuccess(data, file);
		} catch (err) {
			onError(err);
		}
	};

	const optionRender = (_: any, record: CategoryColumns) => {
		return (
			<Space wrap>
				<UpdateBtn onClick={() => onUpdate(record as CategoryColumns)} />
				<DeleteBtn id={(record as CategoryColumns).key} handleDelete={onDelete} />
			</Space>
		);
	};

	const categoryImage = (_: unknown, record: CategoryColumns) => {
		return (
			<Space wrap>
				<Image
					width={96}
					src={record.image}
					preview={{
						maskClassName: "customize-mask",
						mask: (
							<Space direction="vertical" align="center">
								<ZoomInOutlined />
								图片
							</Space>
						)
					}}
				/>
			</Space>
		);
	};

	return (
		<BasicContent>
			<>
				<CreateBtn onCreate={onCreate} />
				{categoryList.length > 0 && (
					<BasicTable columns={categoryColumns(optionRender, categoryImage)} dataSource={categoryList} />
				)}
				<BasicModal title={modalTitle} open={isModalOpen} onOk={handleOk} onCancel={OnCancelBtn}>
					<BasicForm
						formRef={createFormRef}
						list={createList({
							customRequest,
							fileList
						})}
						data={categoryName}
						handleFinish={handleCreate}
					/>
				</BasicModal>
			</>
		</BasicContent>
	);
};

export default Article;
