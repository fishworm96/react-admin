import http from "@/api";
import { PORT1 } from "../config/servicePort";
import { RoleApi } from "../interface";

export const getRoleList = () => {
	return http.get<RoleApi.RoleList[]>(`${PORT1}/role`);
};

export const getRoleAccess = (id: number) => {
	return http.get<RoleApi.RoleAccess>(`${PORT1}/role?id=${id}`);
};

export const updateRoleAccess = (tree: { role_id: number; access_id: number[] }) => {
	return http.put(`${PORT1}/role_access`, tree);
};

export const updateRole = (role: RoleApi.RoleList) => {
	return http.put(`${PORT1}/role`, role);
};

export const createRole = (tree: { title: string; description: string }) => {
	return http.post(`${PORT1}/role`, tree);
};

export const deleteRole = (id: number) => {
	return http.delete(`${PORT1}/role/${id}`);
};
