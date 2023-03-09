import { PORT1 } from "@/api/config/servicePort";

import http from "@/api";
import { Content } from "../interface";

/**
 * @name 登录模块
 */
// * 用户登录接口

// * 获取文章列表
export const getPostList = () => {
	return http.get<Content.ResArticle[]>(`${PORT1}/post`);
};

// 获取标签列表
export const resGetTagList = () => {
	return http.get<Content.ResTag[]>(`${PORT1}/tag`);
};

// 获取分类列表
export const resGetCategoryList = () => {
	return http.get<Content.ResTag[]>(`${PORT1}/community`);
};

// 创建文章
export const reqCreateArticle = (params: Content.ReqArticle) => {
	return http.post(`${PORT1}/post`, params);
};

// 获取文章信息
export const resGetPostDetailByPostId = (id: string) => {
	return http.get<Content.ResPostDetail>(`${PORT1}/post/${id}`);
};

// 修改文章
export const reqEditPost = (params: Content.ReqEditArticle) => {
	return http.put(`${PORT1}/post/edit`, params);
};

export const reqDeletePost = (id: string) => {
	return http.delete(`${PORT1}/post/${id}`);
};
