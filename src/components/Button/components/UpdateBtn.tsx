import { Button, ButtonProps } from "antd";

interface Props extends ButtonProps {
	name?: string;
}

const UpdateBtn = (props: Props) => {
	// 清除自定义属性
	const params: Partial<ButtonProps> = { ...props };
	return (
		<Button type="primary" {...params}>
			{props.name || "编辑"}
		</Button>
	);
};

export default UpdateBtn;
