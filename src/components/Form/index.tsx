import { FormList } from "#/form";
import { Data } from "@/views/access/menu";
import { Form, FormProps, Space } from "antd";
import { ReactNode, Ref, useEffect, useImperativeHandle } from "react";
import { getComponent } from "./utils/componentMap";
import { handleValuePropName } from "./utils/helper";

export interface IFormFn {
	handleSubmit: () => void;
	handleReset: () => void;
	getValue: (key: string) => unknown;
	handlerChange: <T extends Record<string, string | number>>(...args: [T]) => void;
}

interface Props extends FormProps {
	list: FormList[];
	data?: Data;
	formRef: Ref<IFormFn>;
	children?: ReactNode;
	handleFinish: FormProps["onFinish"];
}

const BasicForm = ({ list, data, children, formRef, handleFinish }: Props) => {
	const [form] = Form.useForm();

	useEffect(() => {
		form.setFieldsValue(data);
	}, [form, data]);

	useImperativeHandle(formRef, () => ({
		getValue: (key: string) => {
			return form.getFieldValue(key);
		},
		handlerChange: (...args) => {
			form.setFieldsValue(...args);
		},
		handleReset: () => {
			form.resetFields();
		},
		handleSubmit: () => {
			form.submit();
		}
	}));

	const onFinish = (value: any) => {
		if (handleFinish) {
			handleFinish(value);
		}
	};

	return (
		<Form form={form} name="form_item_path" layout="vertical" onFinish={onFinish}>
			<Space size="large" wrap>
				{list.map(item => (
					<Form.Item
						key={`${item.name}`}
						label={item.label}
						name={item.name}
						rules={!item.hidden ? item.rules : []}
						className={item.hidden ? "!hidden" : ""}
						valuePropName={handleValuePropName(item.component)}
					>
						{getComponent(item)}
					</Form.Item>
				))}

				{children}
			</Space>
		</Form>
	);
};

export default BasicForm;
