import { useAppSelector } from "@/redux/hooks";
import "./index.less";

export const LayoutFooter = () => {
	const themeConfig = useAppSelector(state => state.global.themeConfig);
	return (
		<>
			{!themeConfig.footer && (
				<div className="footer">
					<a href="" target="_blank" rel="noreferrer">
						Admin
					</a>
				</div>
			)}
		</>
	);
};
