import { Link } from "react-router-dom";
import "./index.less";

const Error401 = () => {
	return (
		<div className="main">
			<h1>401</h1>
			<h2>没有访问权限</h2>
			<Link to="/admin/home">返回首页</Link>
		</div>
	);
};
export default Error401;
