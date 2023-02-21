import { CascadedOptions, Data } from "@/views/access/menu";
import { Cascader, Form, FormProps, Input, Select, Space } from "antd";
import { Ref, useEffect, useImperativeHandle } from "react";
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
	data: Data;
	formRef: Ref<IFormFn>;
	handleFinish: FormProps["onFinish"];
}

const BasicForm = ({ data, options, formRef, handleFinish }: Props) => {
	const [form] = Form.useForm();
	const { css_prefix_text, glyphs } = icons;
	console.log(data);
	useEffect(() => {
		if (data && data.module_id === 0) {
			form.setFieldsValue({ ...data, parentName: "根目录" });
			return;
		}
		if (data) {
			form.setFieldsValue({ ...data, parentName: data.title });
		}
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
		console.log("onChange:", value, selectedOptions);
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
				<Form.Item name="parentName" label="父节点名称">
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
				<Form.Item name="module_id">
					<div></div>
				</Form.Item>
			</Space>
		</Form>
	);
};

export default BasicForm;
