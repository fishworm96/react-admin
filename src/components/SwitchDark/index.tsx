import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setThemeConfig } from "@/redux/modules/global/globalSlice";
import { Switch } from "antd";

export const SwitchDark = () => {
	const themeConfig = useAppSelector(state => state.global.themeConfig);
	const dispatch = useAppDispatch();
	const onChange = (checked: boolean) => {
		dispatch(setThemeConfig({ ...themeConfig, isDark: checked }));
	};

	return (
		<Switch
			className="dark"
			defaultChecked={themeConfig.isDark}
			checkedChildren={<>🌞</>}
			unCheckedChildren={<>🌜</>}
			onChange={onChange}
		/>
	);
};
