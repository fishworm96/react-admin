import { Layout } from "antd";
import { AssemblySize } from "./componentes/AssemblySize";
import { AvatarIcon } from "./componentes/AvatarIcon";
import { CollapseIcon } from "./componentes/CollapseIcon";
import { Theme } from "./componentes/Theme";
// import BreadcrumbNav from "./componentes/BreadcrumbNav";
import "./index.less";

const LayoutHeader = () => {
	const { Header } = Layout;

	return (
		<Header>
			<div className="header-lf">
				<CollapseIcon />
				{/* <BreadcrumbNav /> */}
			</div>
			<div className="header-ri">
				<AssemblySize />
				<Theme />
				<span className="username">Hooks</span>
				<AvatarIcon />
			</div>
		</Header>
	);
};

export default LayoutHeader;
