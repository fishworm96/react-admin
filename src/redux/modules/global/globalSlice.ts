import type { GlobalState, ThemeConfigProp } from "@/redux/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux";
import type { SizeType } from "antd/lib/config-provider/SizeContext";

const initialState: GlobalState = {
	token: "",
	userInfo: "",
	assemblySize: "middle",
	language: "",
	themeConfig: {
		// 默认 primary 主题颜色
		primary: "#1890ff",
		// 深色模式
		isDark: false,
		// 色弱模式(weak) || 灰色模式(gray)
		weakOrGray: "",
		// 面包屑导航
		breadcrumb: true,
		// 标签页
		tabs: true,
		// 页脚
		footer: true
	}
};

export const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setToken: (state, action: PayloadAction<string>) => {
			state.token = action.payload;
		},
		setAssemblySize: (state, action: PayloadAction<SizeType>) => {
			state.assemblySize = action.payload;
		},
		setLanguage: (state, action: PayloadAction<string>) => {
			state.language = action.payload;
		},
		setThemeConfig: (state, action: PayloadAction<ThemeConfigProp>) => {
			state.themeConfig = action.payload;
		}
	}
});

export const { setToken, setAssemblySize, setLanguage, setThemeConfig } = globalSlice.actions;

export const selectToken = (state: RootState) => state.global.token;
export const selectThemeConfig = (state: RootState) => state.global.themeConfig;
export const selectAssemblySize = (state: RootState) => state.global.assemblySize;

export default globalSlice.reducer;
