import { CreateBtn, DeleteBtn, UpdateBtn } from "@/components/Button";
import { callbackParams } from "@/components/Button/components/DeleteBtn";
import BasicContent from "@/components/Content";
import BasicForm, { IFormFn } from "@/components/Form";
import BasicModal from "@/components/Modal";
import BasicTable from "@/components/Table";
import { MenuState } from "@/redux/interface";
import { message, Space } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { TableColumns, tableColumns } from "./model";

export interface BtnObj {
	id: number;
	icon: string;
	module_id: number;
	path: string;
	title: string;
}

export interface CascadedOptions {
	label: string;
	value: string | number;
	children?: CascadedOptions[];
}

const Menu: React.FC<MenuState> = ({ menuList }: MenuState) => {
	const createFormRef = useRef<IFormFn>(null);
	const [btnObj, setBtnObj] = useState<BtnObj>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [tableData, seTableData] = useState<TableColumns[]>([]);

	useEffect(() => {
		seTableData(changeTableData(menuList!));
	}, [menuList]);

	const changeTableData = (list: Menu.MenuOptions[]): TableColumns[] => {
		return list.map((item, index) => {
			const { id, title, module_id, children, path, icon } = item;
			const cascadedOption: TableColumns = {
				id: id,
				key: `${module_id}_${index.toString()}`,
				title: title,
				module_id: module_id,
				path: path,
				icon: icon
			};

			if (children && children.length) {
				cascadedOption.children = changeTableData(children);
			}
			return cascadedOption;
		});
	};

	const onUpdate = (btnObj: BtnObj) => {
		setIsModalOpen(true);
		setBtnObj(btnObj);
	};

	const handleOk = () => {
		createFormRef.current?.handleSubmit();
	};

	const handleCreate = (value: any) => {
		try {
			setIsModalOpen(false);
			console.log(value);
			message.success("修改成功！");
		} catch {
			setIsModalOpen(false);
		}
	};

	const onDelete = ({ isOk, id }: callbackParams) => {
		if (isOk) {
			message.success("删除成功！");
			console.log(id, menuList);
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

	const optionRender: ITableOptions<object> = (_, record) => {
		return (
			<Space wrap>
				<UpdateBtn onClick={() => onUpdate(record as BtnObj)} />
				<DeleteBtn id={(record as BtnObj).id.toString()} handleDelete={onDelete} />
			</Space>
		);
	};

	return (
		<BasicContent>
			<>
				<CreateBtn />
				<BasicTable columns={tableColumns(optionRender)} dataSource={tableData} />
				<BasicModal width={1000} title={"编辑"} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
					<BasicForm
						formRef={createFormRef}
						options={cascadedOptions(menuList!)}
						list={menuList!}
						btnObj={btnObj!}
						handleFinish={handleCreate}
					/>
				</BasicModal>
			</>
		</BasicContent>
	);
};

const mapStateToProps = (state: MenuState) => state.menu;
export default connect(mapStateToProps)(Menu);
