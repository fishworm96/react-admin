// * Menu
declare namespace Menu {
	interface MenuOptions {
		path: string;
		title: string;
		id: number;
		module_id: number;
		icon: string;
		isLink?: string;
		close?: boolean;
		children?: MenuOptions[];
		button?: any;
	}
}

// * Vite
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_API_URL: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_GLOB_APP_TITLE: string;
	VITE_DROP_CONSOLE: boolean;
	VITE_PROXY_URL: string;
	VITE_BUILD_GZIP: boolean;
	VITE_REPORT: boolean;
}

declare interface MenuInfo {
	key: string;
	keyPath: string[];
	item: React.ReactInstance;
	domEvent: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
}
