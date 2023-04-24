import type {
	InputProps,
	InputNumberProps,
	SelectProps,
	TreeSelectProps,
	CheckboxProps,
	RadioProps,
	DatePickerProps,
	TimePickerProps,
	UploadProps,
	RateProps,
	SliderSingleProps,
	TimeRangePickerProps,
	CascaderProps,
	changeOnSelect
} from "antd";
import type { RangePickerProps } from "antd/lib/date-picker";
import type { RuleObject } from "antd/lib/form";

// 数据类型
export type FormData = Record<string, AllTypeData>;

// 基础数据组件
type DefaultDataComponents = "Input" | "InputNumber" | "TextArea" | "InputPassword" | "AutoComplete" | "customize";

// 下拉组件
type SelectComponents = "Select" | "TreeSelect" | "ApiSelect" | "ApiTreeSelect";

// 级联选择
type CascaderComponents = "Cascader";

// 复选框组件
type CheckboxComponents = "Checkbox" | "CheckboxGroup";

// 单选框组件
type RadioComponents = "RadioGroup" | "Switch";

// 时间组件
type TimeComponents = "DatePicker" | "RangePicker" | "TimePicker" | "TimeRangePicker";

// 上传组件
type UploadComponents = "Upload";

// 星级组件
type RateComponents = "Rate";

// 穿梭俊组件
type TransferComponents = "Transfer";

// 滑动输入条组件
type SliderComponents = "Slider";

// 自定义组件
type CustomizeComponents = "customize";

// 富文本编辑器
type EditorComponents = "Editor";

// 密码强度组件
type PasswordStrength = "PasswordStrength";

export type ComponentType =
	| DefaultDataComponents
	| SelectComponents
	| CheckboxComponents
	| CascaderComponents
	| TimeComponents
	| RadioComponents
	| CustomizeComponents
	| UploadComponents
	| RateComponents
	| SliderComponents
	| EditorComponents
	| PasswordStrength
	| TransferComponents
	| ButtonComponents
	| CascaderProps;

// 组件参数
export type ComponentProps =
	| InputProps
	| InputNumberProps
	| SelectProps
	| TreeSelectProps
	| CheckboxProps
	| RadioProps
	| DatePickerProps
	| TimePickerProps
	| UploadProps
	| RateProps
	| SliderSingleProps
	| TimeRangePickerProps
	| RangePickerProps
	| changeOnSelect;

// 表单规则
export type FormRule = RuleObject & {
	trigger?: "blur" | "change" | ["change", "blur"];
};

// 表单数据
export type FormList = {
	name: string | string[]; // 表单域字段
	label: string; // 标签
	placeholder?: string; // 占位符
	hidden?: boolean; // 是否隐藏
	rules?: FormRule[]; // 规则
	labelCol?: number; // label宽度
	wrapperCol?: number; // 内容宽度
	component: ComponentType; // 组件
	componentProps?: ComponentProps; // 组件参数
	render?: ReactElement; // 自定义渲染
	children?: () => JSX.Element; // 子组件
};
