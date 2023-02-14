import { Modal, ModalProps } from "antd";

// interface Props extends Omit<ModalProps, "onCancel"> {
// 	onCancel: () => void;
// }

const BasicModal = (props: ModalProps) => {
	return <Modal {...props}>{props.children}</Modal>;
};

export default BasicModal;
