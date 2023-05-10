import { ConfigProvider } from "antd";
import useTheme from "@/hooks/useTheme";
import Router from "./routes";
import { BrowserRouter } from "react-router-dom";
import AuthRouter from "./routes/utils/authRouter";
import { useAppSelector } from "./redux/hooks";

export function App() {
	const themeConfig = useAppSelector(state => state.global.themeConfig) || "weak";
	const assemblySize = useAppSelector(state => state.global.assemblySize);
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
