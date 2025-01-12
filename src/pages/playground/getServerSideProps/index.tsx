import React from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { InferGetServerSidePropsType } from 'next';

const BASE_URL = 'http://apiluc.zendvn.com/api';

type PostType = {
    PID: string;
    post_content: string;
};
type PropsType = {
    posts: PostType[];
};

type PagePropsType = React.FC<
    InferGetServerSidePropsType<typeof getServerSideProps>
>;

const DemoGetServerSideProps: PagePropsType = ({ posts }: PropsType) => {
    return (
        <div className="container">
            <h1>Demo getServerSideProps</h1>
            <Link href="/playground/getServerSideProps
            /test">Back to Test</Link>
            <ul>
                {posts.map((post) => {
                    return <li key={post.PID}>{post.post_content}</li>;
                })}
            </ul>
        </div>
    );
};

/*
1. getInitialProps -> trực tiếp gọi sang API của herokuapp

2. getServerSideProps
    -> Gọi APi vào Server NextJs  **** Bước trung gian này do NextJs làm tự động cho mình
    -> Server NextJs -> Gọi sang API của HerokuApp
        -> Che giấu được API phía herokuapp

*/
export const getServerSideProps: GetServerSideProps<PropsType> = async (
    context
) => {
    const response = await fetch(
        BASE_URL + '/post/getListPagination.php?pagesize=5&currPage=1'
    );
    const data = await response.json();

    const props = {
        posts: data.posts,
    };

    return {
        props,
    };
};

export default DemoGetServerSideProps;
