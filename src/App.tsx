import { ConfigProvider } from "antd";
import { RouterProvider } from "react-router-dom";
import useTheme from "@/hooks/useTheme";
import router from "./routes";

export function App(props: any) {
	const { assemblySize, themeConfig = "weak" } = props;
	// 全局使用主题
	useTheme(themeConfig);

	return (
		<ConfigProvider componentSize={assemblySize}>
			<RouterProvider router={router} />
		</ConfigProvider>
	);
}
