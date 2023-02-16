import { UpdateBtn } from "@/components/Button";
import DeleteBtn from "@/components/Button/components/DeleteBtn";
import BasicContent from "@/components/Content";
import BasicForm from "@/components/Form";
import BasicModal from "@/components/Modal";
import BasicTable from "@/components/Table";
import { MenuState } from "@/redux/interface";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { Button, Space } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import { tableColumns } from "./model";

type Record = {
	id: string;
	icon: string;
	module_id: number;
	path: string;
	title: string;
};

const Menu: React.FC<MenuState> = ({ menuList }: MenuState) => {
	const [btnId, setBtnId] = useState<number>(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onUpdate = (btnObj: Record) => {
		setIsModalOpen(true);
		setBtnId(btnObj.module_id);
	};

	const handleOk = () => {
		console.log("");
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const optionRender: ITableOptions<object> = (_, record) => {
		return (
			<Space wrap>
				<UpdateBtn onClick={() => onUpdate(record as Record)} />
				<DeleteBtn />
			</Space>
		);
	};

	return (
		<BasicContent>
			<>
				<Button type="primary" icon={<PlusCircleTwoTone />}>
					新增
				</Button>
				<BasicTable columns={tableColumns(optionRender)} dataSource={menuList!} />
				<BasicModal width={1000} title={"编辑"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
					<BasicForm list={menuList!} btnId={btnId} />
				</BasicModal>
			</>
		</BasicContent>
	);
};

const mapStateToProps = (state: MenuState) => state.menu;
export default connect(mapStateToProps)(Menu);
