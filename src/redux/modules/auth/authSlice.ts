import type { AuthState } from "@/redux/interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
	authButtons: {},
	authRouter: []
};

export const menuSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthButtons: (state, action: PayloadAction<{}>) => {
			state.authButtons = action.payload;
		},
		setAuthRouter: (state, action: PayloadAction<string[]>) => {
			state.authRouter = action.payload;
		}
	}
});

export const { setAuthButtons, setAuthRouter } = menuSlice.actions;

export default menuSlice.reducer;
