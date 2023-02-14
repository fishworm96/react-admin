import { Modal, ModalProps } from "antd";

// interface Props extends Omit<ModalProps, "onCancel"> {
// 	onCancel: () => void;
// }

const BasicModal = (props: ModalProps) => {
	return (
		<Modal {...props}>
			<p>Some contents...</p>
			<p>Some contents...</p>
			<p>Some contents...</p>
		</Modal>
	);
};

export default BasicModal;
