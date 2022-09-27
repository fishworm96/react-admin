import * as types from "@/redux/mutation-types";

export const setAuthButtons = (authButtons: { [propName: string]: any }) => ({
	type: types.SET_AUTH_BUTTONS,
	authButtons
});

export const setAuthRouter = (authRouter: string[]) => ({
	type: types.SET_AUTH_ROUTER,
	authRouter
});
