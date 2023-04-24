import { Select, Space } from "antd";
import icons from "@/components/Icon/icons.json";
import BasicIcon from "@/components/Icon";

const Icon = () => {
	const { css_prefix_text, glyphs } = icons;
	return (
		<>
			{glyphs.map(item => (
				<Select.Option key={item.icon_id} value={css_prefix_text + item.font_class}>
					<Space>
						<BasicIcon type={css_prefix_text + item.font_class} />
						{css_prefix_text + item.font_class}
					</Space>
				</Select.Option>
			))}
		</>
	);
};

export default Icon;
