import { Content } from "@/api/interface";
import {
	reqCreateArticle,
	reqEditPost,
	resGetCategoryList,
	resGetPostDetailByPostId,
	resGetTagList as reqGetTagList
} from "@/api/modules/content";
import { Button, Form, Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MarkDownEdit from "./MarkdownEdit";

interface Data {
	label: string;
	value: number;
}

const Option = () => {
	const navigate = useNavigate();
	const { search } = useLocation();
	const id = search.split("=")[1];
	const [form] = Form.useForm();
	const [tagList, setTagList] = useState<Data[]>();
	const [text, setText] = useState<string>();
	const [categoryList, setCategoryList] = useState<Data[]>();
	const [content, setContent] = useState<string>("");

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
			const [tagListRes, categoryListRes, post] = await Promise.all([
				reqGetTagList(),
				resGetCategoryList(),
				resGetPostDetailByPostId(id)
			]);
			setTagList(formData(tagListRes.data!));
			setCategoryList(formData(categoryListRes.data!));
			setContent(post.data!.content);
			form.setFieldsValue({ ...post.data, tag: formData(post.data!.tag) });
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

	const onFinish = async (values: any) => {
		console.log(values);
		if (id) {
			const tagValues =
				Array.isArray(values.tag) && typeof values.tag[0] !== "number"
					? values.tag.map((option: { value: number; label: string }) => option.value)
					: [...values.tag];
			await reqEditPost({ ...values, tag: tagValues, post_id: id, content: text });
		} else {
			await reqCreateArticle({ ...values, content: text });
		}
		navigate(-1);
	};

	const tailLayout = {
		wrapperCol: { offset: 21 }
	};

	return (
		<>
			<Form form={form} style={{ marginRight: 50 }} onFinish={onFinish}>
				<Form.Item label="标题" name="title" rules={[{ required: true, message: "请输入标题!" }]}>
					<Input />
				</Form.Item>
				<Form.Item label="简述" name="description" rules={[{ required: true, message: "请输入简述!" }]}>
					<Input />
				</Form.Item>
				<Form.Item label="分类" name="community_id" rules={[{ required: true, message: "选择分类!" }]}>
					<Select style={{ width: 120 }} options={categoryList} />
				</Form.Item>
				<Form.Item label="标签" name="tag" rules={[{ required: true, message: "请选择标签!" }]}>
					<Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="请选择标签" options={tagList} />
				</Form.Item>
				<MarkDownEdit content={content} markdownText={setText} />
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
