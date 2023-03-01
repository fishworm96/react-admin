import { useCallback, useState } from "react";
import { createEditor, Editor, Transforms } from "slate";
import { Editable, Slate, withReact } from "slate-react";

const MarkDownEdit = () => {
	const [editor] = useState(() => withReact(createEditor()));

	const initialValue = [
		{
			type: "code",
			children: [{ text: "A line of text in a paragraph." }]
		}
	];

	const renderElement = useCallback((props: any) => {
		switch (props.element.type) {
			case "code":
				return <CodeElement {...props} />;
			default:
				return <DefaultElement {...props} />;
		}
	}, []);

	return (
		<Slate editor={editor} value={initialValue}>
			<Editable
				renderElement={renderElement}
				onKeyDown={event => {
					if (event.key === "`" && event.ctrlKey) {
						// Prevent the "`" from being inserted by default.
						event.preventDefault();
						// Otherwise, set the currently selected blocks type to "code".
						Transforms.setNodes(editor, { type: "code" }, { match: n => Editor.isBlock(editor, n) });
					}
				}}
			/>
		</Slate>
	);
};

const CodeElement = (props: any) => {
	return (
		<pre {...props.attributes}>
			<code>{props.children}</code>
		</pre>
	);
};

const DefaultElement = (props: any) => {
	return <p {...props.attributes}>{props.children}</p>;
};
export default MarkDownEdit;
