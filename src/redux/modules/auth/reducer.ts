import { AuthState } from "@/redux/interface";
import produce from "immer";
import { AnyAction } from "redux";
import * as types from "@/redux/mutation-types";

const authState: AuthState = {
	authButtons: {},
	authRouter: []
};

const auth = (state: AuthState = authState, action: AnyAction) =>
	produce(state, (draftState: { authState: any; authRouter: any }) => {
		switch (action.type) {
			case types.SET_AUTH_BUTTONS:
				draftState.authState = action.authButtons;
				break;
			case types.SET_AUTH_ROUTER:
				draftState.authRouter = action.authRouter;
				break;
			default:
				return draftState;
		}
	});

export default auth;
