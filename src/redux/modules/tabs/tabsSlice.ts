import type { TabsState } from "@/redux/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux";
import { HOME_URL } from "@/config/config";

const initialState: TabsState = {
	tabsActive: HOME_URL,
	tabsList: []
};

export const tabsSlice = createSlice({
	name: "tabs",
	initialState,
	reducers: {
		setTabsList: (state, action: PayloadAction<Menu.MenuOptions[]>) => {
			state.tabsList = action.payload;
		},
		setTabsActive: (state, action: PayloadAction<string>) => {
			state.tabsActive = action.payload;
		}
	}
});

export const { setTabsList, setTabsActive } = tabsSlice.actions;

export const selectTabs = (state: RootState) => state.tabs.tabsActive;

export default tabsSlice.reducer;
