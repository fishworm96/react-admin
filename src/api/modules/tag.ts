import { PORT1 } from "@/api/config/servicePort";
import http from "@/api";
import { TagApi } from "../interface";

export const getTagList = () => {
	return http.get<TagApi.ReqTagList[]>(`${PORT1}/tag`);
};

export const getTagDetail = (name: string) => {
	return http.get<TagApi.ReqTagList>(`${PORT1}/tag/${name}`);
};

export const createTag = (tag: { name: string }) => {
	return http.post(`${PORT1}/tag`, tag);
};

export const updateTag = (tag: TagApi.ReqTagList) => {
	return http.put(`${PORT1}/tag/edit`, tag);
};

export const deleteTag = (id: number) => {
	return http.delete(`${PORT1}/tag/${id}`);
};
