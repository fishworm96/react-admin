import { Button, Form, FormProps, Input } from "antd";

interface BasicForm extends FormProps {
	list: Menu.MenuOptions[];
}

const BasicForm = ({ list }: BasicForm) => {
	console.log(list[0].title);

	const onFinish = (value: object) => {
		console.log(value);
	};

	return (
		<Form initialValues={{ RouterName: true }} name="form_item_path" layout="vertical" onFinish={onFinish}>
			<Form.Item name="RouterName" label="路由名称">
				<Input defaultValue="adsfsadf" />
			</Form.Item>

			<Button type="primary" htmlType="submit">
				Submit
			</Button>
		</Form>
	);
};

export default BasicForm;
