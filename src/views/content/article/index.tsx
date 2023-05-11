import { ResArticle } from "@/api/interface";
import { getPostList, deletePost } from "@/api/modules/content";
import { CreateBtn, DeleteBtn, UpdateBtn } from "@/components/Button";
import { callbackParams } from "@/components/Button/components/DeleteBtn";
import BasicContent from "@/components/Content";
import BasicTable from "@/components/Table";
import { Space } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postColumns, PostColumns } from "./model";

const Article = () => {
	const navigate = useNavigate();
	const [postList, setPostList] = useState<PostColumns[]>([]);
	const [total, setTotal] = useState<number>();

	useEffect(() => {
		getPost();
	}, []);

	const formatData = (item: ResArticle[]): PostColumns[] => {
		return item.map(item => {
			const { id, title, author_name, tag, community } = item;
			const Data: PostColumns = { title, author_name, tag, key: id, category: community.name };
			return Data;
		});
	};

	const getPost = async () => {
		try {
			const { data } = await getPostList();
			setPostList(formatData(data.post_list));
			setTotal(data.total_pages);
		} catch (err) {
			// console.log(err);
			return;
		}
	};

	const onCreate = () => {
		navigate("/admin/content/article/option");
	};

	const onUpdate = async (id: string) => {
		navigate(`/admin/content/article/option?id=${id}`);
	};

	const onDelete = async ({ isOk, id }: callbackParams<string>) => {
		if (isOk) {
			id && (await deletePost(id));
			getPost();
		}
	};

	// 切换分页函数
	const handleChangePage = async (page: number) => {
		const { data } = await getPostList(page);
		setPostList(formatData(data.post_list));
	};

	const optionRender: ITableOptions<PostColumns> = (_, record) => {
		return (
			<Space wrap>
				<UpdateBtn onClick={() => onUpdate(record.key)} />
				<DeleteBtn id={record.key} handleDelete={onDelete} />
			</Space>
		);
	};

	return (
		<BasicContent>
			<>
				<CreateBtn onCreate={onCreate} />
				{postList.length > 0 && (
					<BasicTable<PostColumns>
						pagination={{ defaultCurrent: 1, total: total, onChange: handleChangePage }}
						columns={postColumns(optionRender)}
						dataSource={postList}
					/>
				)}
			</>
		</BasicContent>
	);
};

export default Article;
