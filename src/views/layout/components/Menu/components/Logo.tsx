import logo from "@/assets/images/logo.png";
import { useAppSelector } from "@/redux/hooks";

export const Logo = () => {
	const isCollapse = useAppSelector(state => state.menu.isCollapse);
	return (
		<div className="logo-box">
			<img src={logo} alt="logo" className="logo-img" />
			{!isCollapse ? <h2 className="logo-text">在线管理系统</h2> : null}
		</div>
	);
};
