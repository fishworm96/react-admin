import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import globalReducer from "./modules/global/globalSlice";
import tabsReducer from "./modules/tabs/tabsSlice";
import menuReducer from "./modules/menu/menuSlice";
import AuthReducer from "./modules/auth/authSlice";
import breadcrumbReducer from "./modules/breadcrumb/breadcrumbSlice";

// 创建reducer(拆分reducer)
const reducer = combineReducers({
	global: globalReducer,
	menu: menuReducer,
	tabs: tabsReducer,
	auth: AuthReducer,
	breadcrumb: breadcrumbReducer
});

// redux 持久化配置
const persistConfig = {
	key: "redux-state",
	storage: storage
};
const PersistedReducer = persistReducer(persistConfig, reducer);

// 创建 store
const store = configureStore({
	reducer: PersistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		}),
	devTools: import.meta.env.NODE_ENV !== "production"
});

// 创建持久化 store
const persistor = persistStore(store);

export { store, persistor };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
