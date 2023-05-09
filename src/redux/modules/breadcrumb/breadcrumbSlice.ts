import type { BreadcrumbState } from "@/redux/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux";

type breadcrumbList = {
	[propName: string]: any;
};

const initialState: BreadcrumbState = {
	breadcrumbList: {}
};

export const menuSlice = createSlice({
	name: "breadcrumb",
	initialState,
	reducers: {
		setBreadcrumbList: (state, action: PayloadAction<breadcrumbList>) => {
			state.breadcrumbList = action.payload;
		}
	}
});

export const { setBreadcrumbList } = menuSlice.actions;

export const selectBreadcrumbList = (state: RootState) => state.breadcrumb.breadcrumbList;

export default menuSlice.reducer;
