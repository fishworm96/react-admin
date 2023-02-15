import { createFromIconfontCN } from "@ant-design/icons";
import React from "react";

export type IconFontProps = {
	type: string;
	size?: number | string;
};

const IconFont = createFromIconfontCN({
	scriptUrl: "//at.alicdn.com/t/c/font_3897117_02b1247hgmwb.js"
});

const BasicIcon: React.FC<IconFontProps> = (props: IconFontProps) => {
	let { type, size = "20px" } = props;

	type = type.indexOf("icon-") === -1 ? `icon-${type}` : type;

	return <IconFont style={{ fontSize: size }} type={type} />;
};

export default BasicIcon;
