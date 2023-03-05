import { resGetTagList as reqGetTagList } from "@/api/modules/content";
import { Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import MarkDownEdit from "./MarkdownEdit";

interface Tag {
	label: string;
	value: number;
}

const Option = () => {
	// const navigate = useNavigate();
	const [tagList, setTagList] = useState<Tag[]>();

	useEffect(() => {
		getTagList();
	}, []);

	// 获取标签列表
	const getTagList = async () => {
		let tagList: Tag[] = [];
		const { data } = await reqGetTagList();
		if (data) {
			data.forEach(item => {
				const { id, name } = item;
				tagList.push({ label: name, value: id });
			});
		}
		setTagList(tagList!);
	};

	// const onSubmit = () => {
	// 	navigate("/content/article");
	// };

	// const onCancel = () => {
	// 	navigate(-1);
	// };

	// const handleEditorChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
	// 	setEdit(e.target.value);
	// };

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
						options={tagList}
					/>
				</Form.Item>
				<MarkDownEdit content={"# 1"} />
			</Form>
		</>
	);
};

export default Option;
