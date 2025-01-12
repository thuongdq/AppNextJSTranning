import React, { useState } from 'react';
import PostDetailForm from '../../components/PostDetailForm';
import PostDetailSidebar from '../../components/PostDetailSidebar';
import { getTokenSSRAndCSR, useAuthen } from '../../../../helpers';
import postServices from '../../../../servies/postService';
import { useGlobalState } from '../../../../state';
import {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPageContext,
} from 'next';
import { PostType } from '@/pages';
import { TypeCategory } from '.';
import { useRouter } from 'next/router';
type PropsType = {
    url_image: string;
    post_content: string;
    category: string[];
    obj_image: {
        file: File | null;
        base64URL: string;
    };
    postid: string;
};

type PropsEditType = {
    postDetailData: PostType;
    postCategories: TypeCategory[];
};
type PostProps = React.FC<
    InferGetServerSidePropsType<typeof getServerSideProps>
>;

const PostEdit: PostProps = ({ postDetailData, postCategories }) => {
    useAuthen();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [token] = useGlobalState('token');
    const [postData, setPostData] = useState(() => {
        return {
            url_image: postDetailData.url_image,
            post_content: postDetailData.post_content,
            category: postCategories.map((category) => category.tag_index),
            obj_image: {
                file: null,
                base64URL: '',
            },
            postid: router?.query?.postId || '',
        };
    });

    const onChangeDetailForm = (key: String, value: any) => {
        if (key === 'obj_image') {
            setPostData({ ...postData, [key]: value, url_image: '' });
            return;
        }
        setPostData({ ...postData, [key]: value });
    };

    const handleSubmitPost = () => {
        setLoading(true);

        postServices
            .editPost(postData, token as string)
            .then((res) => {
                console.log('res-------', res);
                if (res.status == 200) {
                    alert('cap nhat viet thanh cong');
                    setPostData({
                        ...postData,
                        url_image: res?.data?.post?.url_image || '',
                        obj_image: {
                            file: null,
                            base64URL: '',
                        },
                    });
                } else {
                    alert(res.error);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };
    console.log('postDetailData', postDetailData);
    console.log('postCategories', postData.category);
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <PostDetailForm
                        url_image={postData.url_image}
                        post_content={postData.post_content}
                        obj_image={postData.obj_image}
                        onChangeDetailForm={onChangeDetailForm}
                    />
                </div>
                <div className="col-lg-4">
                    <PostDetailSidebar
                        handleSubmitPost={handleSubmitPost}
                        category={postData.category}
                        onChangeDetailForm={onChangeDetailForm}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps<PropsEditType> = async (
    context
) => {
    console.log(context.req.headers.cookie);

    const ctx = context as NextPageContext;
    const postId = ctx.query.postId as string;

    const [token, userToken] = getTokenSSRAndCSR(ctx);
    const userId = userToken?.id;

    const postDetailPos = postServices.getPostDetail({ postId });

    const [postDetailRes]: any = await Promise.all([postDetailPos]);
    console.log('postDetailRes', postDetailRes);
    let postDetailData = null;

    const props = {
        postDetailData: postDetailRes?.data?.post || {},
        postCategories: postDetailRes?.data?.categories || [],
    };
    // Pass data to the page via props
    return { props };
};

export default PostEdit;
