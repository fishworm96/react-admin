import { CascadedOptions, Data } from "@/views/access/menu";
import { Cascader, Form, FormProps, Input, Select, Space } from "antd";
import { ChangeEvent, Ref, useEffect, useImperativeHandle } from "react";
import BasicIcon from "../Icon";
import icons from "../Icon/icons.json";

export interface IFormFn {
	handleSubmit: () => void;
	handleReset: () => void;
	getValue: (key: string) => unknown;
}

interface Props extends FormProps {
	list?: Menu.MenuOptions[];
	options: CascadedOptions[];
	data?: Data;
	formRef: Ref<IFormFn>;
	handleFinish: FormProps["onFinish"];
}

const BasicForm = ({ data, options, formRef, handleFinish }: Props) => {
	const [form] = Form.useForm();
	const { css_prefix_text, glyphs } = icons;

	useEffect(() => {
		form.setFieldsValue(data);
	}, [form, data]);

	useImperativeHandle(formRef, () => ({
		getValue: (key: string) => {
			return form.getFieldValue(key);
		},
		handleReset: () => {
			form.resetFields();
		},
		handleSubmit: () => {
			form.submit();
		}
	}));

	const onChange = (value: any, selectedOptions: any) => {
		let parent_id =
			selectedOptions[selectedOptions.length - 1].value === 0
				? selectedOptions[selectedOptions.length - 1].value
				: selectedOptions[selectedOptions.length - 1].value.split("_")[1];
		let parent_name = selectedOptions[selectedOptions.length - 1].label;
		form.setFieldsValue({ parent_id, parent_name });
	};

	const changeInputType = (e: ChangeEvent<HTMLInputElement>) => {
		form.setFieldsValue({ type: +e.target.value });
	};

	const changeSelectHandler = (value: { value: string; label: React.ReactNode }) => {
		console.log(value);
	};

	const displayRender = (labels: string[]) => labels[labels.length - 1];

	const onFinish = (value: any) => {
		if (handleFinish) {
			handleFinish(value);
		}
	};

	return (
		<Form form={form} name="form_item_path" layout="vertical" onFinish={onFinish}>
			<Space size="large" wrap>
				<Form.Item name="title" label="路由名称" rules={[{ required: true, message: "请输入路由名称" }]}>
					<Input style={{ width: 250 }} />
				</Form.Item>
				<Form.Item name="path" label="路由路径" rules={[{ required: true, message: "请输入路由路径" }]}>
					<Input style={{ width: 250 }} />
				</Form.Item>
<<<<<<< HEAD
				<Form.Item name="type" label="菜单等级" rules={[{ required: true, message: "请输入路由路径" }]}>
					<Input style={{ width: 250 }} />
=======
				<Form.Item name="type" label="菜单等级" rules={[{ required: true, message: "请输入菜单等级" }]}>
					<Input type="number" min={1} onChange={changeInputType} style={{ width: 250 }} />
>>>>>>> 42569252895f84ee9988cf6749e6d4aee6111be5
				</Form.Item>
				<Form.Item name="icon" label="图标">
					<Select onChange={changeSelectHandler} style={{ width: 250 }}>
						{glyphs.map(item => {
							return (
								<Select.Option key={item.icon_id} value={css_prefix_text + item.font_class}>
									<Space>
										<BasicIcon type={css_prefix_text + item.font_class} />
										{css_prefix_text + item.font_class}
									</Space>
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>
<<<<<<< HEAD
				<Form.Item name="parent_name" label="父节点名称">
=======
				<Form.Item name="parent_name" label="父节点名称" rules={[{ required: true, message: "请选择父节点名称" }]}>
>>>>>>> 42569252895f84ee9988cf6749e6d4aee6111be5
					<Cascader
						style={{ width: 250 }}
						options={options}
						expandTrigger="hover"
						displayRender={displayRender}
						onChange={onChange}
						maxTagCount="responsive"
						changeOnSelect
					/>
				</Form.Item>
				<Form.Item name="parent_id">
					<div></div>
				</Form.Item>
			</Space>
		</Form>
	);
};

export default BasicForm;
