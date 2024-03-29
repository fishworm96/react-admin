import { HOME_URL } from "@/config/config";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal, Dropdown, Avatar } from "antd";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import avatar from "@/assets/images/avatar.png";
import InfoModal from "./InfoModal";
import PasswordModal from "./PasswordModal";
import { useAppDispatch } from "@/redux/hooks";
import { setToken } from "@/redux/modules/global/globalSlice";

export const AvatarIcon = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	interface ModalProps {
		showModal: (params: { name: number }) => void;
	}
	const passRef = useRef<ModalProps>(null);
	const infoRef = useRef<ModalProps>(null);

	// 退出登录
	const logout = () => {
		Modal.confirm({
			title: "温馨提示",
			icon: <ExclamationCircleOutlined />,
			content: "是否确认退出登录",
			okText: "确认",
			cancelText: "取消",
			onOk: () => {
				dispatch(setToken(""));
				message.success("退出登录成功");
				navigate("/admin");
			}
		});
	};

	// Dropdown Menu
	const items = [
		{
			key: "1",
			label: <span className="dropdown-item">首页</span>,
			onClick: () => navigate(HOME_URL)
		},
		{
			key: "2",
			label: <span className="dropdown-item">个人信息</span>,
			onClick: () => infoRef.current!.showModal({ name: 11 })
		},
		{
			key: "3",
			label: <span className="dropdown-item">修改密码</span>,
			onClick: () => passRef.current!.showModal({ name: 11 })
		},
		{
			key: "4",
			label: <span className="dropdown-item">退出登录</span>,
			onClick: logout
		}
	];
	return (
		<>
			<Dropdown menu={{ items }} placement="bottom" arrow trigger={["click"]}>
				<Avatar size="large" src={avatar}></Avatar>
			</Dropdown>
			<InfoModal innerRef={infoRef}></InfoModal>
			<PasswordModal innerRef={passRef}></PasswordModal>
		</>
	);
};
