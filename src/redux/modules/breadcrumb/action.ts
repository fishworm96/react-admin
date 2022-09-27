import * as types from "@/redux/mutation-types";

export const setBreadcrumbList = (breadcrumbList: { [propsName: string]: any }) => ({
	type: types.SET_BREADCRUMB_LIST,
	breadcrumbList
});
