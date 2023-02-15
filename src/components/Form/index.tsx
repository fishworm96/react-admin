import { Cascader, Form, FormProps, Input, Select, Space } from "antd";
import { BaseOptionType, DefaultOptionType } from "antd/lib/select";
import BasicIcon from "../Icon";
import iocns from "../Icon/icons.json";

interface BasicForm extends FormProps {
	list: Menu.MenuOptions[];
}

interface CascadedOptions {
	label: string;
	value: string | number;
	children?: CascadedOptions[];
}

const BasicForm = ({ list }: BasicForm) => {
	console.log(list);
	const { css_prefix_text, glyphs } = iocns;

	const cascadedOptions = (list: Menu.MenuOptions[]): (DefaultOptionType | BaseOptionType)[] => {
		let option: CascadedOptions = {
			label: "",
			value: "",
			children: []
		};
		let options: CascadedOptions[] = [];
		list.forEach((item: Menu.MenuOptions) => {
			option.label = item.title;
			option.value = item.id;
			if (item.children) {
				cascadedOptions(item.children);
			}
		});
		options.push(option);
		return options;
	};

	console.log(list[0]);

	const onFinish = (value: object) => {
		console.log(value);
	};

	return (
		<Form initialValues={list[0]} name="form_item_path" layout="vertical" onFinish={onFinish}>
			<Space size="large" wrap>
				<Form.Item name="title" label="路由名称" rules={[{ required: true }]}>
					<Input style={{ width: 250 }} />
				</Form.Item>
				<Form.Item name="path" label="路由路径" rules={[{ required: true }]}>
					<Input style={{ width: 250 }} />
				</Form.Item>
				<Form.Item label="图标">
					<Select defaultValue="icon-shangdian" style={{ width: 250 }}>
						{glyphs.map((item, value) => {
							return (
								<Select.Option key={value} value={css_prefix_text + item.font_class}>
									<Space>
										<BasicIcon type={css_prefix_text + item.font_class} />
										{css_prefix_text + item.font_class}
									</Space>
								</Select.Option>
							);
						})}
					</Select>
				</Form.Item>
				<Form.Item label="父节点ID">
					<Cascader
						style={{ width: "100%" }}
						options={cascadedOptions(list)}
						// onChange={onChange}
						maxTagCount="responsive"
					/>
				</Form.Item>
			</Space>
		</Form>
	);
};

export default BasicForm;
