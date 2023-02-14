import { Button, ButtonProps } from "antd";

// interface IProps extends ButtonProps{
// }

const UpdateBtn = (props: ButtonProps) => {
	// 清除自定义属性
	const params: Partial<ButtonProps> = { ...props };
	return (
		<Button type="primary" {...params}>
			编辑
		</Button>
	);
};

export default UpdateBtn;
