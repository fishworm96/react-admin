import { PORT1 } from "@/api/config/servicePort";

import http from "@/api";

export const updateMenuStatus = (menu: { id: number; is_show: boolean }) => {
	return http.put(`${PORT1}/menu/status`, menu);
};
