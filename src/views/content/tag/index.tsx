import { TagApi } from "@/api/interface";
import { createTag, deleteTag, getTagList, updateTag } from "@/api/modules/tag";
import { CreateBtn, DeleteBtn, UpdateBtn } from "@/components/Button";
import { callbackParams } from "@/components/Button/components/DeleteBtn";
import BasicContent from "@/components/Content";
import BasicForm, { IFormFn } from "@/components/Form";
import BasicModal from "@/components/Modal";
import BasicTable from "@/components/Table";
import { ADD_TITLE, EDIT_TITLE } from "@/utils/constants";
import { Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { createList, tagColumns, TagColumns } from "./model";

const Article = () => {
	const createFormRef = useRef<IFormFn>(null);
	const [tag, setTag] = useState<TagColumns[]>([]);
	const [modalTitle, setModalTitle] = useState<string>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [tagName, setTagName] = useState<{}>("");

	useEffect(() => {
		getTag();
	}, []);

	const formatData = (item: TagApi.ReqTagList[]): TagColumns[] => {
		return item.map(item => {
			const { id, name } = item;
			const Data: TagColumns = { key: id, name };
			return Data;
		});
	};

	const getTag = async () => {
		try {
			const { data } = await getTagList();
			setTag(formatData(data));
		} catch (err) {
			console.error(err);
			return;
		}
	};

	const onCreate = () => {
		setModalTitle(ADD_TITLE);
		createFormRef.current?.handleReset();
		setIsModalOpen(true);
		setTagName("");
	};

	const onUpdate = (tag: TagColumns) => {
		setModalTitle(EDIT_TITLE);
		setIsModalOpen(true);
		if (tag) {
			setTagName(tag);
		}
	};

	const onDelete = async ({ isOk, id }: callbackParams<number>) => {
		if (isOk && id) {
			await deleteTag(id);
			setTag(tag.filter(item => item.key !== id));
		}
	};

	const handleOk = () => {
		createFormRef.current?.handleSubmit();
	};

	// 创建或更新菜单
	const handleCreate = async (value: TagColumns) => {
		try {
			if (value.key) {
				await updateTag({ name: value.name, id: value.key });
				setTag(tag.map(item => (item.key === value.key ? value : item)));
				return;
			}
			await createTag(value);
			getTag();
		} finally {
			setIsModalOpen(false);
		}
	};

	const optionRender = (_: any, record: TagColumns) => {
		return (
			<Space wrap>
				<UpdateBtn onClick={() => onUpdate(record as TagColumns)} />
				<DeleteBtn id={(record as TagColumns).key} handleDelete={onDelete} />
			</Space>
		);
	};

	return (
		<BasicContent>
			<>
				<CreateBtn onCreate={onCreate} />
				{tag.length > 0 && <BasicTable columns={tagColumns(optionRender)} dataSource={tag} />}
				<BasicModal title={modalTitle} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
					<BasicForm formRef={createFormRef} list={createList()} data={tagName} handleFinish={handleCreate} />
				</BasicModal>
			</>
		</BasicContent>
	);
};

export default Article;
