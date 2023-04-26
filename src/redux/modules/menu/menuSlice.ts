import type { MenuState } from "@/redux/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux";

const initialState: MenuState = {
	isCollapse: false,
	menuList: []
};

export const menuSlice = createSlice({
	name: "menu",
	initialState,
	reducers: {
		updateCollapse: (state, action: PayloadAction<boolean>) => {
			state.isCollapse = action.payload;
		},
		setMenuListAction: (state, action: PayloadAction<Menu.MenuOptions[]>) => {
			state.menuList = action.payload;
		}
	}
});

export const { updateCollapse, setMenuListAction } = menuSlice.actions;

export const selectCollapse = (state: RootState) => state.menu.isCollapse;

export const selectMenuList = (state: RootState) => state.menu.menuList;

export default menuSlice.reducer;
