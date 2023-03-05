import React, { useEffect, useRef, useState } from "react";
import MdEditor, { ExposeParam } from "md-editor-rt";
import "md-editor-rt/lib/style.css";

import "./markdown.less";
import axios from "axios";

const MarkDownEdit = ({ content }: { content: string }) => {
	const [text, setText] = useState("");
	const editorRef = useRef<ExposeParam>();

	useEffect(() => {
		editorRef.current?.on("catalog", console.log);
		upLoadImage();
		setText(content);
	}, []);

	// 剪贴板上传图片
	const upLoadImage = () => {
		const textarea = document.getElementById("md-editor-rt-textarea");
		textarea?.addEventListener("paste", e => {
			// 获取文本值
			// e.clipboardData?.getData("text");
			// 获取图片
			// 读取到图片对象
			let file = e.clipboardData?.items[0].getAsFile();
			// 判断类型
			if (!file || !/^image\/(jpeg|png|gif|jpg)$/.test(file!.type)) {
				return;
			}
			editorRef.current?.insert(file => {
				/**
				 * @return targetValue    待插入内容
				 * @return select         插入后是否自动选中内容
				 * @return deviationStart 插入后选中内容鼠标开始位置
				 * @return deviationEnd   插入后选中内容鼠标结束位置
				 */
				return {
					targetValue: `${file}`,
					select: true,
					deviationStart: 0,
					deviationEnd: 0
				};
			});
		});
	};

	const onUploadImg = async (files: Array<File>, callback: (urls: Array<string>) => void) => {
		console.log(files, callback);
		const res = await Promise.all(
			files.map(file => {
				return new Promise((rev, rej) => {
					const form = new FormData();
					form.append("file", file);

					axios
						.post("/api/img/uploads", form, {
							headers: {
								"Content-Type": "multipart/form-data"
							}
						})
						.then(res => rev(res))
						.catch(error => rej(error));
				});
			})
		);

		callback(res.map(item => item.data.url));
	};

	return <MdEditor ref={editorRef} style={{ height: 700 }} modelValue={text} onChange={setText} onUploadImg={onUploadImg} />;
};

export default MarkDownEdit;
