import { LoginApi } from "@/api/interface";
import { loginApi } from "@/api/modules/login";
import { HOME_URL } from "@/config/config";
import { useAppDispatch } from "@/redux/hooks";
import { setToken } from "@/redux/modules/global/globalSlice";
import { setTabsList } from "@/redux/modules/tabs/tabsSlice";
// import { useTranslation } from "react-i18next";
import { CloseCircleOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
// import md5 from "js-md5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
	// const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [loading, setLoading] = useState<boolean>(false);

	// 登录
	const onFinish = async (loginForm: LoginApi.ReqLoginForm) => {
		try {
			setLoading(true);
			// loginForm.password = md5(loginForm.password);
			const { data } = await loginApi(loginForm);
			data && dispatch(setToken(data.token));
			dispatch(setTabsList([]));
			message.success("登录成功！");
			navigate(HOME_URL);
		} finally {
			setLoading(false);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item name="username" rules={[{ required: true, message: "请输入用户名" }]}>
				<Input placeholder="用户名" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: "请输入密码" }]}>
				<Input.Password autoComplete="new-password" placeholder="密码" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login-btn">
				<Button
					onClick={() => {
						form.resetFields();
					}}
					icon={<CloseCircleOutlined />}
				>
					{"重置"}
				</Button>
				<Button type="primary" htmlType="submit" loading={loading} icon={<UserOutlined />}>
					{"登录"}
				</Button>
			</Form.Item>
		</Form>
	);
};
