import { useAppSelector } from "@/redux/hooks";
import "./index.less";

export const LayoutFooter = () => {
	const themeConfig = useAppSelector(state => state.global.themeConfig);
	return (
		<>
			{!themeConfig.footer && (
				<div className="footer">
					<a href="http://www.spicyboy.cn/" target="_blank" rel="noreferrer">
						2022 © Hooks-Admin By Hooks Technology.
					</a>
				</div>
			)}
		</>
	);
};
