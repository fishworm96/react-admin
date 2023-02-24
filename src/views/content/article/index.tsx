import { Content } from "@/api/interface";
import { getPostList } from "@/api/modules/content";
import { DeleteBtn, UpdateBtn } from "@/components/Button";
import BasicContent from "@/components/Content";
import BasicTable from "@/components/Table";
import { Space } from "antd";
import { useEffect, useState } from "react";
import { postColumns, PostColumns } from "./model";

const Article = () => {
	const [postList, setPostList] = useState<PostColumns[]>([]);

	useEffect(() => {
		getPost();
	}, []);

	const formatData = (item: Content.ResArticle[]): PostColumns[] => {
		return item.map(item => {
			const { title, author_name, tag, community } = item;
			const Data: PostColumns = { title, author_name, tag, introduction: community.introduction };
			return Data;
		});
	};

	const getPost = async () => {
		const { data } = await getPostList();
		setPostList(formatData(data as Content.ResArticle[]));
	};

	const onUpdate = (id: number) => {
		console.log(id);
	};

	const onDelete = () => {
		console.log(123);
	};

	const optionRender: ITableOptions<object> = (_, record) => {
		return (
			<Space wrap>
				<UpdateBtn onClick={() => onUpdate((record as Menu.MenuOptions).id)} />
				<DeleteBtn id={(record as Menu.MenuOptions).id} handleDelete={onDelete} />
			</Space>
		);
	};

	return (
		<BasicContent>
			<>
				{/* <CreateBtn /> */}
				{postList.length > 0 && <BasicTable<PostColumns> columns={postColumns(optionRender)} dataSource={postList} />}
			</>
		</BasicContent>
	);
};

export default Article;
