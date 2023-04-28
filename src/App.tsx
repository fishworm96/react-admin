import { ConfigProvider } from "antd";
import useTheme from "@/hooks/useTheme";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import AuthRouter from "./routes/utils/authRouter";

export function App(props: any) {
	const { assemblySize, themeConfig = "weak" } = props;
	// 全局使用主题
	useTheme(themeConfig);

	return (
		<BrowserRouter>
			<ConfigProvider componentSize={assemblySize}>
				<AuthRouter>
					<Router />
				</AuthRouter>
			</ConfigProvider>
		</BrowserRouter>
	);
}
