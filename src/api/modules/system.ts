import { PORT1 } from "@/api/config/servicePort";

import http from "@/api";
import { System } from "../interface";

/**
 * @name 登录模块
 */
// * 用户登录接口

// * 获取菜单列表
export const getMenuById = (id: number) => {
	return http.get<System.ResMenuInfo>(`${PORT1}/menu?id=${id}`);
};

// 根据id删除菜单
export const deleteMenuById = (id: number) => {
	return http.delete(`${PORT1}/menu/${id}`);
};

// 创建菜单
export const createMenuById = (params: System.ReqUpdateMenu) => {
	return http.post(`${PORT1}/menu`, params);
};

export const updateMenu = (params: System.ReqUpdateMenu, id: number) => {
	return http.put(`${PORT1}/menu`, { ...params, id });
};
