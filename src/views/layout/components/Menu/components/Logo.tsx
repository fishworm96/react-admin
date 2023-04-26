import logo from "@/assets/images/logo.png";
import { useAppSelector } from "@/redux/hooks";

export const Logo = () => {
	const isCollapse = useAppSelector(state => state.menu.isCollapse);
	return (
		<div className="logo-box">
			<img src={logo} alt="logo" className="logo-img" />
			{!isCollapse ? <h2 className="logo-text">Hooks Admin</h2> : null}
		</div>
	);
};
