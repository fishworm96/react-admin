import { PlusCircleTwoTone } from "@ant-design/icons";
import { Button } from "antd";

interface Props {
	onCreate: () => void;
}

const CreateBtn = ({ onCreate }: Props) => {
	return (
		<>
			<Button onClick={onCreate} type="primary" icon={<PlusCircleTwoTone />}>
				新增
			</Button>
		</>
	);
};

export default CreateBtn;
