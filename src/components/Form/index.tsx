import { BtnObj } from "@/views/access/menu";
import { Cascader, Form, FormProps, Input, Select, Space } from "antd";
import { useEffect } from "react";
import BasicIcon from "../Icon";
import icons from "../Icon/icons.json";

interface Props extends FormProps {
	list: Menu.MenuOptions[];
	btnObj: BtnObj;
}

interface CascadedOptions {
	label: string;
	value: string | number;
	children?: CascadedOptions[];
}

const BasicForm = ({ list, btnObj }: Props) => {
	const [form] = Form.useForm();
	// const [parentName, setParentName] = useState<string>("根目录");
	const { css_prefix_text, glyphs } = icons;

	useEffect(() => {
		getParentName(btnObj, list);
	}, [btnObj]);

	const cascadedOptions = (list: Menu.MenuOptions[]): CascadedOptions[] => {
		const lists = list.map(item => {
			const { id, title, module_id, children } = item;
			const cascadedOption: CascadedOptions = { label: title, value: `${module_id}_${id}` };

			if (children && children.length) {
				cascadedOption.children = cascadedOptions(children);
			}
			return cascadedOption;
		});
		if (list[0].module_id === 0) lists.unshift({ label: "根目录", value: 0 });
		return lists;
	};

	const getParentName = (btnObj: BtnObj, list: Menu.MenuOptions[], parent?: BtnObj) => {
		list.forEach(item => {
			const { id, children } = item;
			if (btnObj.module_id === 0) {
				form.setFieldsValue({ ...item, parentName: "根目录" });
				return;
			}
			if (id === btnObj.id && parent?.title) {
				form.setFieldsValue({ ...item, parentName: parent?.title });
				return;
			}
			if (children && children.length) {
				getParentName(btnObj, children, item);
			}
		});
	};

	const onChange = (value: any, selectedOptions: any) => {
		console.log(value, selectedOptions);
	};

	const changeSelectHandler = (value: { value: string; label: React.ReactNode }) => {
		console.log(value);
	};

	const displayRender = (labels: string[]) => labels[labels.length - 1];

	const onFinish = (value: any) => {
		console.log(value);
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
						options={cascadedOptions(list)}
						expandTrigger="hover"
						displayRender={displayRender}
						onChange={onChange}
						maxTagCount="responsive"
						changeOnSelect
					/>
				</Form.Item>
			</Space>
		</Form>
	);
};

export default BasicForm;
