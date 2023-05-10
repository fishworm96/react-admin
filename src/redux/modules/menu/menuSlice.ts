import type { MenuState } from "@/redux/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export default menuSlice.reducer;
