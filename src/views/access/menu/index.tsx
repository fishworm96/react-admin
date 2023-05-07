import { SystemApi } from "@/api/interface";
import { getMenuList } from "@/api/modules/login";
import { createMenuById, deleteMenuById, getMenuById, updateMenu } from "@/api/modules/system";
import { CreateBtn, DeleteBtn, UpdateBtn } from "@/components/Button";
import { callbackParams } from "@/components/Button/components/DeleteBtn";
import BasicContent from "@/components/Content";
import BasicForm, { IFormFn } from "@/components/Form";
import BasicModal from "@/components/Modal";
import BasicTable from "@/components/Table";
import { MenuState } from "@/redux/interface";
import { message, Space, Switch } from "antd";
import React, { useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { createList, TableColumns, tableColumns } from "./model";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setMenuListAction } from "@/redux/modules/menu/menuSlice";
import { ADD_TITLE, EDIT_TITLE } from "@/utils/constants";
import { updateMenuStatus } from "@/api/modules/menu";

export interface Option {
	value?: string | number | null;
	label: React.ReactNode;
	children?: Option[];
	isLeaf?: boolean;
	loading?: boolean;
}

export interface Data {
	id: number;
	module_id: number;
	parentId: number;
	type: number;
	icon: string;
	path: string;
	title: string;
	parentName: string;
}

export interface CascadedOptions {
	label: string;
	value: string | number;
	children?: CascadedOptions[];
	disabled?: boolean;
}

const Menu: React.FC<MenuState> = () => {
	const dispatch = useAppDispatch();
	const menuListValue = useAppSelector(state => state.menu.menuList);
	const createFormRef = useRef<IFormFn>(null);
	const [data, setData] = useState<Data>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [menuId, setMenuId] = useState<number | null>();
	const [modalTitle, setModalTitle] = useState<string>();
	const [tableData, seTableData] = useState<TableColumns[]>([]);

	useEffect(() => {
		menuListValue && seTableData(changeTableData(menuListValue));
	}, [menuListValue]);

	const changeTableData = (list: Menu.MenuOptions[]): TableColumns[] => {
		return list.map((item, index) => {
			const { id, title, module_id, children, path, icon, type, is_show } = item;
			const cascadedOption: TableColumns = {
				id,
				key: `${module_id}_${index.toString()}`,
				title: title,
				module_id,
				type,
				path: path,
				icon: icon,
				is_show
			};

			if (children && children.length) {
				cascadedOption.children = changeTableData(children);
			}
			return cascadedOption;
		});
	};

	const onCreate = () => {
		setModalTitle(ADD_TITLE);
		createFormRef.current?.handleReset();
		setIsModalOpen(true);
		setMenuId(null);
	};

	const onUpdate = async (id: number) => {
		setModalTitle(EDIT_TITLE);
		setIsModalOpen(true);
		if (id) {
			setMenuId(id);
			try {
				const { data } = await getMenuById(id);
				setData(data);
			} catch {
				// message.error("获取数据失败，请重试");
			}
		}
	};

	const handleOk = () => {
		createFormRef.current?.handleSubmit();
	};

	// 创建或更新菜单
	const handleCreate = async (value: SystemApi.ReqUpdateMenu) => {
		try {
			setIsModalOpen(false);
			menuId ? await updateMenu(value, menuId) : await createMenuById(value);
			const { data } = await getMenuList();
			data && dispatch(setMenuListAction(data));
		} catch {
			setIsModalOpen(false);
		}
	};

	const onDelete = async ({ isOk, id }: callbackParams<number>) => {
		try {
			if (isOk && id) {
				await deleteMenuById(id);
				const { data } = await getMenuList();
				data && dispatch(setMenuListAction(data));
				message.success("删除成功！");
			}
		} finally {
			setIsModalOpen(false);
		}
	};

	const cascadedOptions = (list: Menu.MenuOptions[]): CascadedOptions[] => {
		const lists = list.map(item => {
			const { id, title, module_id, children } = item;
			const cascadedOption: CascadedOptions = { label: title, value: `${module_id}_${id}` };

			if (children && children.length) {
				cascadedOption.children = cascadedOptions(children);
			}
			return cascadedOption;
		});
		if (list[0].module_id === 0) lists.unshift({ label: "根目录", value: 0 });
		return lists;
	};

	const handlerCascaderOnChange = (value: string[], selectedOptions: Option[]) => {
		const lastOption = selectedOptions[selectedOptions.length - 1];
		if (lastOption) {
			const module_id = typeof lastOption.value === "string" ? lastOption.value.split("_")[1] : lastOption.value;
			const parent_name = typeof lastOption.label === "string" ? lastOption.label : undefined;
			module_id && parent_name && createFormRef.current?.handlerChange({ module_id: +module_id, parent_name });
		}
	};

	const changeInputType = (e: ChangeEvent<HTMLInputElement>) => {
		createFormRef.current?.handlerChange({ type: +e.target.value });
	};

	const handleChangeStatus = async (is_show: boolean, id: number) => {
		await updateMenuStatus({ id, is_show });
		const { data } = await getMenuList();
		// 把路由菜单处理成一维数组，存储到 redux 中，做菜单权限判断
		dispatch(setMenuListAction(data));
	};

	const displayRender = (labels: string[]) => labels[labels.length - 1];

	const optionStats = (value: boolean, record: TableColumns) => {
		return (
			<Switch
				onChange={value => handleChangeStatus(value, record.id)}
				checkedChildren="显示"
				unCheckedChildren="隐藏"
				defaultChecked={value}
			/>
		);
	};

	const optionRender: ITableOptions<TableColumns> = (_, record) => {
		return (
			<Space wrap>
				<UpdateBtn onClick={() => onUpdate(record.id)} />
				<DeleteBtn id={record.id} handleDelete={onDelete} />
			</Space>
		);
	};

	return (
		<BasicContent>
			<>
				<CreateBtn onCreate={onCreate} />
				<BasicTable<TableColumns> columns={tableColumns(optionRender, optionStats)} dataSource={tableData} />
				<BasicModal width={1000} title={modalTitle} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
					<BasicForm
						formRef={createFormRef}
						list={createList({
							displayRender,
							options: cascadedOptions(menuListValue!),
							changeInputType,
							handlerCascaderOnChange
						})}
						data={data}
						handleFinish={handleCreate}
					/>
				</BasicModal>
			</>
		</BasicContent>
	);
};

export default Menu;
