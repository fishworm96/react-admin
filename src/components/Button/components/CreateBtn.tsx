import { PlusCircleTwoTone } from "@ant-design/icons";
import { Button } from "antd";

const CreateBtn = () => {
	return (
		<>
			<Button type="primary" icon={<PlusCircleTwoTone />}>
				新增
			</Button>
		</>
	);
};

export default CreateBtn;
