import { Link } from "react-router-dom";

const Error401 = () => {
	return (
		<>
			<div>没有访问权限</div>
			<Link to="/home">返回登录页</Link>
		</>
	);
};
export default Error401;
