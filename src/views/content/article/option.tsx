import { Form, Input, Select } from "antd";
import MarkDownEdit from "./MarkdownEdit";
import type { SelectProps } from "antd";

const Option = () => {
	// const navigate = useNavigate();

	// const onSubmit = () => {
	// 	navigate("/content/article");
	// };

	// const onCancel = () => {
	// 	navigate(-1);
	// };

	// const handleEditorChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
	// 	setEdit(e.target.value);
	// };

	const options: SelectProps["options"] = [{ label: 1, value: 1 }];

	const handleChange = (value: string[]) => {
		console.log(`selected ${value}`);
	};

	return (
		<>
			<Form style={{ marginRight: 50 }}>
				<Form.Item label="标题" name="title" rules={[{ required: true, message: "Please input your username!" }]}>
					<Input />
				</Form.Item>
				<Form.Item label="简述" name="describe" rules={[{ required: true, message: "Please input your username!" }]}>
					<Input />
				</Form.Item>
				<Form.Item label="标签" name="tag" rules={[{ required: true, message: "请选择标签" }]}>
					<Select
						mode="multiple"
						allowClear
						style={{ width: "100%" }}
						placeholder="请选择标签"
						// defaultValue={["a10", "c12"]}
						onChange={handleChange}
						options={options}
					/>
				</Form.Item>
				<MarkDownEdit content={"# 1"} />
			</Form>
		</>
	);
};

export default Option;
