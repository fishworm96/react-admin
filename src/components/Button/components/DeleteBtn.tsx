import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

export interface callbackParams {
	isOk: boolean;
	id?: number | string;
}

interface Props {
	id?: number | string;
	handleDelete: (params: callbackParams) => void;
}

const DeleteBtn = (props: Props) => {
	const { id, handleDelete } = props;
	const { confirm } = Modal;

	const showConfirm = () => {
		confirm({
			icon: <ExclamationCircleOutlined />,
			content: "确认删除吗？",
			onOk() {
				handleDelete({ isOk: true, id: id });
			},
			onCancel() {
				handleDelete({ isOk: false });
			},
			okText: "确认",
			cancelText: "取消"
		});
	};

	return (
		<Button type="primary" onClick={showConfirm} danger>
			删除
		</Button>
	);
};

export default DeleteBtn;
