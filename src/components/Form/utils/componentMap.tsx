import type { ComponentType, FormList } from "#/form";
import { Button, Cascader, Input, Select, Tree, Upload } from "antd";
import { initComProps } from "./helper";

const componentMap = new Map();

// antd 组件注入
componentMap.set("Input", Input);
componentMap.set("Select", Select);
componentMap.set("Cascader", Cascader);
componentMap.set("Button", Button);
componentMap.set("Upload", Upload);
componentMap.set("Tree", Tree);

export const getComponent = ({ component, componentProps, render, children }: FormList) => {
	// 当组件类型为自定义时
	if (component === "customize") {
		// 获取组件自定义渲染失败直接返回空标签
		if (!render) return <></>;
		addComponent("customize", render);
	}

	const Comp = componentMap.get(component);
	// 获取组件失败直接返回空标签
	if (!Comp) return <></>;

	return component !== "Input" && children ? (
		<Comp {...initComProps(component)} {...componentProps}>
			{children()}
		</Comp>
	) : (
		<Comp {...initComProps(component)} {...componentProps} />
	);
};

export const addComponent = (name: ComponentType, component: unknown) => {
	componentMap.set(name, component);
};

export const deleteComponent = (name: ComponentType) => {
	componentMap.delete(name);
};
