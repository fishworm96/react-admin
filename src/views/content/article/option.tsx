import { Form, Input, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import MarkDownEdit from "./markDownEdit";

const Option = () => {
	const navigate = useNavigate();

	const onSubmit = () => {
		navigate("/content/article");
	};

	const onCancel = () => {
		navigate(-1);
	};

	// const handleEditorChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
	// 	setEdit(e.target.value);
	// };

	return (
		<>
			<Modal title="Modal 1000px width" centered open={true} onOk={onSubmit} onCancel={onCancel} width={1800}>
				<div style={{ display: "flex", alignContent: "space-between" }}>
					<Form style={{ marginRight: 50 }}>
						<Form.Item label="标题" name="title" rules={[{ required: true, message: "Please input your username!" }]}>
							<Input />
						</Form.Item>
						<Form.Item label="简述" name="describe" rules={[{ required: true, message: "Please input your username!" }]}>
							<Input />
						</Form.Item>
						<Form.Item label="标签" name="tag" rules={[{ required: true, message: "Please input your username!" }]}>
							<Input />
						</Form.Item>
						{/* <Form.Item
							style={{ width: 800 }}
							label="内容"
							name="content"
							rules={[{ required: true, message: "Please input your username!" }]}
						></Form.Item> */}
						<MarkDownEdit />
					</Form>
				</div>
			</Modal>
		</>
	);
};

export default Option;
