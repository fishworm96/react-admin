import { RoleApi, SystemApi } from "@/api/interface";
import { getMenu } from "@/api/modules/system";
import { CreateBtn, DeleteBtn, UpdateBtn } from "@/components/Button";
import { callbackParams } from "@/components/Button/components/DeleteBtn";
import BasicContent from "@/components/Content";
import BasicForm, { IFormFn } from "@/components/Form";
import BasicModal from "@/components/Modal";
import BasicTable from "@/components/Table";
import { ADD_TITLE, EDIT_TITLE } from "@/utils/constants";
import { message, Space, TreeProps } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { createList, createRoleAccessList, RoleColumns, roleColumns } from "./model";
import { createRole, deleteRole, getRoleAccess, getRoleList, updateRole, updateRoleAccess } from "@/api/modules/role";
import { DataNode } from "antd/lib/tree";

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

const Role = () => {
	const createFormRef = useRef<IFormFn>(null);
	const roleAccessRef = useRef<IFormFn>(null);
	const [treeData, setTreeData] = useState<DataNode[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isRoleModalOpen, setIsRoleModalOpen] = useState<boolean>(false);
	// const [menuId, setMenuId] = useState<number | null>();
	const [modalTitle, setModalTitle] = useState<string>();
	const [roleList, setRoleList] = useState<RoleColumns[]>([]);
	// 更新角色权限
	const [roleAccess, setRoleAccess] = useState<number[] | undefined>(undefined);
	// 展开树数组
	const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
	// 修改树数组
	const [treeKey, setTreeKey] = useState<string[]>([]);
	const [roleId, setRoleId] = useState<number>(0);
	const [role, setRole] = useState<RoleApi.RoleList | undefined>(undefined);

	useEffect(() => {
		handleGetRoleList();
	}, []);

	const formatData = (item: RoleApi.RoleList[]): RoleColumns[] => {
		return item.map(item => {
			const { id, title, description } = item;
			const Data: RoleColumns = { key: id, title, description };
			return Data;
		});
	};

	const formatRoleAccess = (MenuList: SystemApi.ResMenuInfo[]) => {
		return MenuList.map(item => {
			const { id, title, children } = item;
			const roleAccess: DataNode = { key: id.toString(), title };
			if (children) {
				roleAccess.children = formatRoleAccess(children);
			}
			return roleAccess;
		});
	};

	// 获取角色列表
	const handleGetRoleList = async () => {
		const [role, menu] = await Promise.all([getRoleList(), getMenu()]);
		setTreeData(formatRoleAccess(menu.data));
		setRoleList(formatData(role.data));
	};

	const onCreate = () => {
		setModalTitle(ADD_TITLE);
		createFormRef.current?.handleReset();
		setIsModalOpen(true);
		setRole(undefined);
	};

	const onUpdate = async (id: number) => {
		setModalTitle(EDIT_TITLE);
		setIsModalOpen(true);
		const { data } = await getRoleAccess(id);
		setRole(data.role);
	};

	// 修改权限按钮
	const onUpdateRoleAccessBtn = async (id: number) => {
		setRoleId(id);
		setIsRoleModalOpen(true);
		try {
			const { data } = await getRoleAccess(id);
			setExpandedKeys(data.access_ids);
			setTreeKey(data.access_ids);
		} catch (err) {
			console.log(err);
		}
	};

	// 表单确定按钮
	const handleOk = () => {
		createFormRef.current?.handleSubmit();
	};

	// 创建或更新角色函数
	const handleCreate = async (value: RoleApi.RoleList) => {
		try {
			value.id ? await updateRole(value) : await createRole(value);
			handleGetRoleList();
		} finally {
			setIsModalOpen(false);
		}
	};

	// 修改角色权限函数
	const handleUpdateRoleAccess = async () => {
		if (!roleAccess) return;
		try {
			await updateRoleAccess({ role_id: roleId, access_id: roleAccess.reverse() });
		} finally {
			setIsRoleModalOpen(false);
		}
	};

	// 展开树形
	const onExpand = (expandedKeysValue: string[]) => {
		setExpandedKeys(expandedKeysValue);
	};

	// 删除按钮
	const onDelete = async ({ isOk, id }: callbackParams<number>) => {
		try {
			if (isOk && id) {
				setRoleList(roleList.filter(item => item.key != id));
				await deleteRole(id);
				message.success("删除成功！");
			}
		} finally {
			("");
		}
	};

	// 修改角色权限
	const onCheck: TreeProps["onCheck"] = (checkedKeys, info) => {
		setTreeKey(checkedKeys as string[]);
		const childrenRole = info.checkedNodes?.map(item => {
			return item.key;
		});
		const role = info.halfCheckedKeys
			?.reverse()
			.concat(childrenRole?.reverse() ?? [])
			.map(item => +item);
		setRoleAccess(role);
	};

	const optionRender: ITableOptions<RoleColumns> = (_, record) => {
		return (
			<Space wrap>
				<UpdateBtn name="修改权限" onClick={() => onUpdateRoleAccessBtn(record.key)} />
				<UpdateBtn onClick={() => onUpdate(record.key)} />
				<DeleteBtn id={record.key} handleDelete={onDelete} />
			</Space>
		);
	};

	return (
		<BasicContent>
			<>
				<CreateBtn onCreate={onCreate} />
				<BasicTable columns={roleColumns(optionRender)} dataSource={roleList} />
				{/* 权限列表模态框 */}
				<BasicModal
					width={1000}
					title={modalTitle}
					open={isRoleModalOpen}
					onOk={handleUpdateRoleAccess}
					onCancel={() => setIsRoleModalOpen(false)}
				>
					<BasicForm
						formRef={roleAccessRef}
						list={createRoleAccessList({
							treeData,
							treeKey,
							expandedKeys,
							onCheck,
							onExpand
						})}
						handleFinish={handleUpdateRoleAccess}
					/>
				</BasicModal>
				{/* 权限内容模态框 */}
				<BasicModal width={600} title={modalTitle} open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
					<BasicForm formRef={createFormRef} list={createList()} data={role} handleFinish={handleCreate} />
				</BasicModal>
			</>
		</BasicContent>
	);
};

export default Role;
