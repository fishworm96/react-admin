import { Button, ButtonProps } from "antd";

const DeleteBtn = (props: ButtonProps) => {
	return (
		<Button type="primary" {...props} danger>
			删除
		</Button>
	);
};

export default DeleteBtn;
