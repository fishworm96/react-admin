import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

export interface callbackParams<T> {
	isOk: boolean;
	id?: T;
}

interface Props<T> {
	id?: T;
	handleDelete: (params: callbackParams<T>) => void;
}

const DeleteBtn = <T extends number | string>(props: Props<T>) => {
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
