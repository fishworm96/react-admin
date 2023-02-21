import { PORT1 } from "@/api/config/servicePort";

import http from "@/api";

/**
 * @name 登录模块
 */
// * 用户登录接口

// * 获取菜单列表
export const getMenuById = (id: number) => {
	return http.get<Menu.MenuOptions>(PORT1 + `/menu?id=${id}`);
};
