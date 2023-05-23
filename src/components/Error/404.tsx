import { Link } from "react-router-dom";
import "./index.less";

const Error404 = () => {
	return (
		<div className="main">
			<h1>404</h1>
			<h2>没有该页面</h2>
			<Link to="/admin/home">返回首页</Link>
		</div>
	);
};
export default Error404;
