import { Modal, ModalProps } from "antd";

// interface Props extends Omit<ModalProps, "onCancel"> {
// 	onCancel: () => void;
// }

const BasicModal = (props: ModalProps) => {
	return (
		<Modal okText={"确定"} cancelText={"取消"} {...props}>
			{" "}
			{props.children}
		</Modal>
	);
};

export default BasicModal;
