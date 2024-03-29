import MdEditor, { ExposeParam } from "md-editor-rt";
import "md-editor-rt/lib/style.css";
import { useEffect, useRef, useState } from "react";

import { getMd5 } from "@/utils/util";
import "./markdown.less";
import { uploadImage } from "@/api/modules/upload";

const MarkDownEdit = ({ content, markdownText }: { content: string; markdownText: (text: string) => void }) => {
	const [text, setText] = useState<string>("");
	const editorRef = useRef<ExposeParam>();

	useEffect(() => {
		upLoadImage();
		setText(content);
	}, [content]);

	useEffect(() => {
		markdownText(text);
	}, [text]);

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
		const res = await Promise.all(
			files.map(file => {
				return new Promise((rev, rej) => {
					const form = new FormData();
					form.append("image", file);

					getMd5(file).then(res => {
						form.append("md5", res);
						uploadImage(form)
							.then(result => rev(result))
							.catch(error => rej(error));
					});
				});
			})
		);
		callback(res.map((item: any) => item.data.url));
	};

	return (
		<>
			<MdEditor ref={editorRef} style={{ height: 650 }} modelValue={text} onChange={setText} onUploadImg={onUploadImg} />
		</>
	);
};

export default MarkDownEdit;
