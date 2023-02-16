import { Cascader, Form, FormProps, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import BasicIcon from "../Icon";
import icons from "../Icon/icons.json";

interface BasicForm extends FormProps {
	list: Menu.MenuOptions[];
	btnId: number;
}

interface CascadedOptions {
	label: string;
	value: string | number;
	children?: CascadedOptions[];
}

const BasicForm = ({ list, btnId }: BasicForm) => {
	const [cascadedDefault, setCascadedDefault] = useState<string[]>(["根目录"]);
	const { css_prefix_text, glyphs } = icons;

	useEffect(() => {
		getParentName(btnId);
	}, [btnId]);

	const cascadedOptions = (list: Menu.MenuOptions[]): CascadedOptions[] => {
		const lists = list.map(item => {
			const { title, id, children } = item;
			const cascadedOption: CascadedOptions = { label: title, value: id };

			if (children && children.length) {
				cascadedOption.children = cascadedOptions(children);
			}
			return cascadedOption;
		});
		if (list[0].module_id === 0) lists.unshift({ label: "根目录", value: 0 });
		return lists;
	};

	const getParentName = (btnId: number) => {
		list.forEach(item => {
			const { title, id, module_id } = item;
			if (id === btnId) {
				setCascadedDefault([title]);
				console.log("123" + cascadedDefault, title);
				return;
			}
			if (module_id === 0) {
				setCascadedDefault(["根目录"]);
				// console.log(cascadedDefault);
				return;
			}
		});
	};

	const onChange = (value: any, selectedOptions: any) => {
		console.log(selectedOptions);
	};

	const displayRender = (labels: string[]) => labels[labels.length - 1];

	const onFinish = (value: object) => {
		console.log(value, btnId);
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
						style={{ width: 250 }}
						defaultValue={[cascadedDefault]}
						options={cascadedOptions(list)}
						expandTrigger="hover"
						displayRender={displayRender}
						onChange={onChange}
						maxTagCount="responsive"
					/>
				</Form.Item>
			</Space>
		</Form>
	);
};

export default BasicForm;
