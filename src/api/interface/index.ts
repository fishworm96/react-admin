// * 请求响应参数(不包含data)
export interface Result {
	code: string;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}

// * 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

export interface Tag {
	id: number;
	name: string;
}

export interface Community {
	id: number;
	name: string;
	introduction: string;
	create_time: Date;
}

// * 登录
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		token: string;
	}
	export interface ResAuthButtons {
		[propName: string]: any;
	}
}

export namespace System {
	export interface ResMenuInfo {
		id: number;
		module_id: number;
		parentId: number;
		type: number;
		icon: string;
		path: string;
		title: string;
		parentName: string;
	}
	export interface ReqUpdateMenu {
		title: string;
		path: string;
		type: number;
		module_id: number;
		id?: number;
		icon?: string;
	}
}

export namespace Content {
	export interface ResArticle {
		id: number;
		author_name: string;
		vote_num: number;
		author_id: number;
		status: number;
		title: string;
		tag: string[];
		community: Community;
		description: string;
	}
	export interface ResTag {
		id: number;
		name: string;
	}
	export interface ReqArticle {
		title: string;
		content: string;
		description: string;
		community_id: number;
		tag: number[];
	}
}
