import { PostType } from '@/pages';

import PostItem from '../PostItem';
import PostCommentForm from '../PostCommentForm';
import PostCommentList from '../PostCommentList';
import { TypeCategory, TypeComment } from '@/pages/post/[postId]';
import Link from 'next/link';
import { useState } from 'react';
import postServices from '../../../../servies/postService';
import { useRouter } from 'next/router';
import { useGlobalState } from '../../../../state';
type PropsType = {
    postDetailData: PostType;
    postCategories: TypeCategory[];
    listComments: TypeComment[];
};
const PostDetailContent: React.FC<PropsType> = ({
    postDetailData,
    postCategories,
    listComments: initListComments,
}) => {
    const router = useRouter();
    const [token] = useGlobalState('token') as string;
    const postid = router.query.postId as string;
    const [listComments, setListComments] = useState(initListComments);

    const hanSubmitForm = async (
        commentValue: string,
        callback: (e?: any) => void
    ) => {
        try {
            const result = await postServices.postComment({
                postId: postid,
                comment: commentValue,
                token,
            });
            if (result.status !== 200)
                throw new Error('Dang binh luan khong thanh cong');
            const listCommentsRes = await postServices.getCommentsByPostId({
                postId: postid,
            });
            if (result.status === 200) {
                setListComments(listCommentsRes.comments);
                callback();
            }
        } catch (error) {
            callback(error);
        }
    };
    return (
        <div className="ass1-section__list">
            <PostItem post={postDetailData} />
            <div className="list-categories">
                <h5>Danh mục</h5>
                <ul>
                    {postCategories.map((category) => {
                        return (
                            <li key={category.tag_index}>
                                <Link
                                    href={`/categories/[cateId]`}
                                    as={`/categories/${category.tag_index}`}
                                >
                                    {category.tag_value}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <PostCommentForm hanSubmitForm={hanSubmitForm} />

            <PostCommentList listComments={listComments} />
        </div>
    );
};

export default PostDetailContent;
