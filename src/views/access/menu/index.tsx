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

type IRowData = {
	id: string;
};

const Menu: React.FC<MenuState> = ({ menuList }: MenuState) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const onUpdate = (id: string) => {
		setIsModalOpen(true);
		console.log(id);
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
				<UpdateBtn onClick={() => onUpdate((record as IRowData).id)}></UpdateBtn>
				<DeleteBtn></DeleteBtn>
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
					<BasicForm list={menuList!} />
				</BasicModal>
			</>
		</BasicContent>
	);
};

const mapStateToProps = (state: MenuState) => state.menu;
export default connect(mapStateToProps)(Menu);
