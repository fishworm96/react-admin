/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-children-prop */
import { Form, Input, Modal } from "antd";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import ReactMarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import MarkdownIt from "markdown-it";
import { useNavigate } from "react-router-dom";
import remarkGfm from "remark-gfm";

const Option = () => {
	const navigate = useNavigate();
	const [edit, setEdit] = useState<string>("");
	const mdParser = new MarkdownIt(/* Markdown-it options */);

	const onSubmit = () => {
		navigate("/content/article");
	};

	const onCancel = () => {
		navigate(-1);
	};

	const handleEditorChange = ({ text }: { text: any }) => {
		console.log(text);
		// setEdit(html);
	};

	return (
		<>
			<Modal title="Modal 1000px width" centered open={true} onOk={onSubmit} onCancel={onCancel} width={1000}>
				<div style={{ display: "flex", alignContent: "space-between" }}>
					<Form style={{ marginRight: 100 }}>
						<Form.Item label="标题" name="title" rules={[{ required: true, message: "Please input your username!" }]}>
							<Input />
						</Form.Item>
						<Form.Item label="简述" name="describe" rules={[{ required: true, message: "Please input your username!" }]}>
							<Input />
						</Form.Item>
						<Form.Item label="标签" name="tag" rules={[{ required: true, message: "Please input your username!" }]}>
							<Input />
						</Form.Item>
						<Form.Item label="内容" name="content" rules={[{ required: true, message: "Please input your username!" }]}>
							<ReactMarkdownEditor
								style={{ height: 500, width: 800 }}
								value={edit}
								renderHTML={text => mdParser.render(text)}
								onChange={handleEditorChange}
							/>
						</Form.Item>
					</Form>
					<div style={{ minWidth: 900, maxWidth: 900 }}>
						<ReactMarkdown children={edit} remarkPlugins={[remarkGfm]} className="markdown-preview" />
					</div>
				</div>
			</Modal>
		</>
	);
};

export default Option;
