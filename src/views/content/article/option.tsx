import { Form, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const Option = () => {
	const navigate = useNavigate();

	const onSubmit = () => {
		navigate("/content/article");
	};

	const onCancel = () => {
		navigate(-1);
	};

	return (
		<>
			<Modal title="Modal 1000px width" centered open={true} onOk={onSubmit} onCancel={onCancel} width={2000}>
				<Form style={{ maxWidth: 600 }}>
					<Form.Item label="标题" name="title" rules={[{ required: true, message: "Please input your username!" }]}>
						<Input />
					</Form.Item>
					<Form.Item label="简述" name="title" rules={[{ required: true, message: "Please input your username!" }]}>
						<Input />
					</Form.Item>
					<Form.Item label="标签" name="title" rules={[{ required: true, message: "Please input your username!" }]}>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</>
	);
};

export default Option;
