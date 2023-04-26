import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";
import { HOME_URL } from "@/config/config";
import { useAppSelector } from "@/redux/hooks";

export const BreadcrumbNav = (props: any) => {
	const { pathname } = useLocation();
	const themeConfig = useAppSelector(state => state.global.themeConfig);
	const breadcrumbList = props.breadcrumb.breadcrumbList[pathname] || [];

	return (
		<>
			{!themeConfig.breadcrumb && (
				<Breadcrumb>
					<Breadcrumb.Item href={`#${HOME_URL}`}>首页</Breadcrumb.Item>
					{breadcrumbList.map((item: string) => {
						return <Breadcrumb.Item key={item}>{item !== "首页" ? item : null}</Breadcrumb.Item>;
					})}
				</Breadcrumb>
			)}
		</>
	);
};
