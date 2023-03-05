import { PORT1 } from "@/api/config/servicePort";

import http from "@/api";
import { Content } from "../interface";

/**
 * @name 登录模块
 */
// * 用户登录接口

// * 获取菜单列表
export const getPostList = () => {
	return http.get<Content.ResArticle[]>(`${PORT1}/post`);
};

export const resGetTagList = () => {
	return http.get<Content.ResTag[]>(`${PORT1}/tag`);
};
