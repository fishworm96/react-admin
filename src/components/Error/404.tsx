import { Link } from "react-router-dom";

const Error404 = () => {
	return (
		<>
			<div>404没有该页面</div>
			<Link to="/admin">返回登录页</Link>
		</>
	);
};
export default Error404;
