import Head from 'next/head';
import Image from 'next/image';
import { Geist, Geist_Mono } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import PostListItem from './components/PostListItem';
import HomeSidebar from './components/HomeSidebar';

import { GetServerSideProps, NextPage, NextPageContext } from 'next';
import { InferGetServerSidePropsType } from 'next';
import { useEffect } from 'react';
import postServices from '../../servies/postService';
import { getTokenSSRAndCSR } from '../../helpers';

export type PostType = {
    USERID: string;
    profilepicture: string;
    fullname: string;
    PID: string;
    url_image: string;
    post_content: string;
    time_added: string;
    status: string;
    count: string | null;
};

type HomeDataProps = {
    listPosts: PostType[];
    userPosts: PostType[];
};

type HomeProps = React.FC<
    InferGetServerSidePropsType<typeof getServerSideProps>
>;

const Home: HomeProps = ({ listPosts, userPosts }) => {
    useEffect(() => {
        // console.log('List Posts: ', listPosts);
        // console.log('User Posts: ', userPosts);
        return () => {};
    }, []);
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <PostListItem listPosts={listPosts} />
                </div>
                <div className="col-lg-4">
                    <HomeSidebar userPosts={userPosts} />
                </div>
            </div>
        </div>
    );
};
export default Home;

export const getServerSideProps: GetServerSideProps<HomeDataProps> = async (
    context
) => {
    console.log(context.req.headers.cookie);

    const ctx = context as unknown as NextPageContext;

    const [token, userToken] = getTokenSSRAndCSR(ctx);
    const userId = userToken?.id;

    const listPostsPos = postServices.getPostsPaging({
        pagesize: 7,
        currPage: 1,
    });
    const userPostsPos = postServices.getPostsByUserId({ userId, token });
    const [listPostsRes, userPostsRes]: any = await Promise.all([
        listPostsPos,
        userPostsPos,
    ]);
    // console.log('listPostsRes', listPostsRes);
    // console.log('userPostsPos', userPostsPos);
    const props = {
        userPosts: userPostsRes?.posts || [],
        listPosts: listPostsRes?.posts || [],
    };
    // Pass data to the page via props
    return { props };
};
