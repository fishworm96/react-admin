import React from "react";

type Props = {
	children: JSX.Element;
};

const BasicContent: React.FC<Props> = ({ children }: Props) => {
	return <div className="content">{children}</div>;
};

export default BasicContent;
