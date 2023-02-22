import { PORT1 } from "@/api/config/servicePort";

import http from "@/api";
import { Data } from "@/views/access/menu";
import { System } from "../interface";

/**
 * @name 登录模块
 */
// * 用户登录接口

// * 获取菜单列表
export const getMenuById = (id: number) => {
	return http.get<Data>(`${PORT1}/menu?id=${id}`);
};

export const AddMenu = (params: System.AddMenu) => {
	return http.post<System.AddMenu>(`${PORT1}/menu`, params);
};
