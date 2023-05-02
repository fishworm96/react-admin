import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import { CategoryApi } from "../interface";

export const getCategoryList = () => {
	return http.get<CategoryApi.Category[]>(`${PORT1}/community`);
};

export const createCategory = (param: { name: string; image: string }) => {
	return http.post(`${PORT1}/community`, param);
};

export const deleteCategory = (id: number) => {
	return http.delete(`${PORT1}/community/${id}`);
};

export const updateCategory = (param: { id: number; name: string; image: string }) => {
	return http.put(`${PORT1}/community`, param);
};
