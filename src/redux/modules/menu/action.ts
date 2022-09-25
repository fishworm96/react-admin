import * as types from "@/redux/mutation-types";

// updateCollapse
export const updateCollapse = (isCollpase: boolean) => ({
	type: types.UPDATE_COLLAPSE,
	isCollpase
});

// setMenuList
export const setMenuList = (menuList: Menu.MenuOptions[]) => ({
	type: types.SET_MENU_LIST,
	menuList
});
