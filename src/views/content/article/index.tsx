import { Content } from "@/api/interface";
import { getPostList } from "@/api/modules/content";
import { CreateBtn, DeleteBtn, UpdateBtn } from "@/components/Button";
import BasicContent from "@/components/Content";
import BasicTable from "@/components/Table";
import { Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postColumns, PostColumns } from "./model";

const Article = () => {
	const navigate = useNavigate();
	const [postList, setPostList] = useState<PostColumns[]>([]);

	useEffect(() => {
		getPost();
	}, []);

	const formatData = (item: Content.ResArticle[]): PostColumns[] => {
		return item.map(item => {
			const { id, title, author_name, tag, community } = item;
			const Data: PostColumns = { title, author_name, tag, key: id, category: community.name };
			return Data;
		});
	};

	const getPost = async () => {
		try {
			const { data } = await getPostList();
			data && setPostList(formatData(data));
		} catch (err) {
			return;
		}
	};

	const onCreate = () => {
		navigate("/content/article/option");
	};

	const onUpdate = async (id: string) => {
		navigate(`/content/article/option?id=${id}`);
	};

	const onDelete = () => {
		console.log(123);
	};

	const optionRender: ITableOptions<object> = (_, record) => {
		return (
			<Space wrap>
				<UpdateBtn onClick={() => onUpdate((record as PostColumns).key)} />
				<DeleteBtn id={(record as Menu.MenuOptions).id} handleDelete={onDelete} />
			</Space>
		);
	};

	return (
		<BasicContent>
			<>
				<CreateBtn onCreate={onCreate} />
				{postList.length > 0 && <BasicTable<PostColumns> columns={postColumns(optionRender)} dataSource={postList} />}
			</>
		</BasicContent>
	);
};

export default Article;
