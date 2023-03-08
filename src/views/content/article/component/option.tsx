import { Content } from "@/api/interface";
import { reqCreateArticle, resGetCategoryList, resGetTagList as reqGetTagList } from "@/api/modules/content";
import { Button, Form, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MarkDownEdit from "./MarkdownEdit";

interface Data {
	label: string;
	value: number;
}

const Option = () => {
	const navigate = useNavigate();
	const [tagList, setTagList] = useState<Data[]>();
	const [text, setText] = useState<string>();
	const [categoryList, setCategoryList] = useState<Data[]>();

	useEffect(() => {
		getTagList();
	}, []);

	const formData = (data: Content.ResTag[]) => {
		let list: Data[] = [];
		data.forEach(item => {
			const { id, name } = item;
			list.push({ label: name, value: id });
		});
		return list;
	};

	// 获取标签列表
	const getTagList = async () => {
		try {
			const [tagListRes, categoryListRes] = await Promise.all([reqGetTagList(), resGetCategoryList()]);
			const tagListData = formData(tagListRes.data!);
			const categoryListData = formData(categoryListRes.data!);
			setTagList(tagListData);
			setCategoryList(categoryListData);
		} catch (error) {
			// 处理错误信息
			return;
			console.log(error);
			// 显示错误信息给用户
			// message.error("获取标签和分类列表失败，请稍后重试");
		}
	};

	const onBack = () => {
		navigate(-1);
	};

	const handleChange = (value: string[]) => {
		console.log(`selected ${value}`);
	};

	const onFinish = async (values: any) => {
		await reqCreateArticle({ ...values, content: text });
		navigate("-1");
	};

	const tailLayout = {
		wrapperCol: { offset: 21 }
	};

	return (
		<>
			<Form style={{ marginRight: 50 }} onFinish={onFinish}>
				<Form.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题!" }]}>
					<Input />
				</Form.Item>
				<Form.Item label="简述" name="description" rules={[{ required: true, message: "请输入简述!" }]}>
					<Input />
				</Form.Item>
				<Form.Item label="分类" name="community_id" rules={[{ required: true, message: "选择分类!" }]}>
					<Select style={{ width: 120 }} onChange={handleChange} options={categoryList} />
				</Form.Item>
				<Form.Item label="标签" name="tag" rules={[{ required: true, message: "请选择标签!" }]}>
					<Select
						mode="multiple"
						allowClear
						style={{ width: "100%" }}
						placeholder="请选择标签"
						onChange={handleChange}
						options={tagList}
					/>
				</Form.Item>
				<MarkDownEdit content={""} markdownText={setText} />
				<Form.Item {...tailLayout}>
					<Space>
						<Button type="primary" htmlType="submit">
							提交
						</Button>
						<Button htmlType="button" onClick={onBack}>
							返回
						</Button>
					</Space>
				</Form.Item>
			</Form>
		</>
	);
};

export default Option;
