import React, { useEffect } from 'react';
import HomeSidebar from '../../components/HomeSidebar';

import { PostType } from '../..';
import {
    GetServerSideProps,
    NextPage,
    InferGetServerSidePropsType,
} from 'next';
import { getTokenSSRAndCSR } from '../../../../helpers';
import postServices from '../../../../servies/postService';
import PostDetailContent from '../../components/PostDetailContent';
import userServices from '../../../../servies/userService';
export type TypeCategory = {
    TAG_ID: string;
    PID: string;
    tag_index: string;
    tag_value: string;
};
export type TypeComment = {
    CID: string;
    PID: string;
    USERID: string;
    fullname: string;
    profilepicture: string;
    comment: string;
    time_added: string;
};
type PropsType = {
    postCategories: TypeCategory[];
    postDetailData: PostType;
    userPosts: PostType[];
    comments: TypeComment[];
};

type PostProps = React.FC<
    InferGetServerSidePropsType<typeof getServerSideProps>
>;

const PostDetail: PostProps = ({
    postCategories,
    postDetailData,
    userPosts,
    comments,
}) => {
    useEffect(() => {
        // console.log('List Posts: ', listPosts);
        // console.log('User Posts: ', userPosts);
        return () => {};
    }, []);

    // console.log('postDetailRes', post);

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <PostDetailContent
                        postDetailData={postDetailData}
                        postCategories={postCategories}
                        listComments={comments}
                    />
                </div>
                <div className="col-lg-4">
                    <HomeSidebar userPosts={userPosts} />
                </div>
            </div>
        </div>
    );
};
export default PostDetail;

export const getServerSideProps: GetServerSideProps<PropsType> = async (
    context
) => {
    console.log(context.req.headers.cookie);

    const ctx = context as NextPageContext;
    const postId = ctx.query.postId;

    const [token, userToken] = getTokenSSRAndCSR(ctx);
    const userId = userToken?.id;

    const userPostsPos = postServices.getPostsByUserId({ userId, token });
    const postDetailPos = postServices.getPostDetail({ postId });
    const CommentsPos = postServices.getCommentsByPostId({ postId });

    const [userPostsRes, postDetailRes, CommentsRes]: any = await Promise.all([
        userPostsPos,
        postDetailPos,
        CommentsPos,
    ]);

    const postUserId = postDetailRes?.data?.post?.USERID;
    let userInfoData = await userServices.getUserById(postUserId);
    let postDetailData = null;
    if (postDetailRes?.data?.post) {
        postDetailData = {
            ...postDetailRes.data.post,
            fullname: userInfoData?.user?.fullname || '',
            profilepicture: userInfoData?.user?.profilepicture || '',
        };
    }
    console.log('userInfoData', userInfoData);
    const props = {
        userPosts: userPostsRes?.posts || [],
        postDetailData,
        postCategories: postDetailRes.data.categories,
        comments: CommentsRes.comments || [],
    };
    // Pass data to the page via props
    return { props };
};
