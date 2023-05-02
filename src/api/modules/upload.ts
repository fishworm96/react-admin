import http from "@/api";
import { PORT1 } from "../config/servicePort";
import { ContentApi } from "../interface";

// 上传图片
export const uploadImage = (file: FormData, onUploadProgress?: (progressEvent: ProgressEvent) => void) => {
	return http.post<ContentApi.UploadImage>(`${PORT1}/upload_image`, file, {
		headers: { "Content-Type": "multipart/form-data" },
		onUploadProgress
	});
};
