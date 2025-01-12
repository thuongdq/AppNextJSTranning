import React from 'react';
import Link from 'next/link';
import { GetStaticProps } from 'next';
import { InferGetStaticPropsType } from 'next';

const BASE_URL = 'http://apiluc.zendvn.com/api';

type PostType = {
    PID: string;
    post_content: string;
};
type PropsType = {
    posts: PostType[];
};

type PagePropsType = React.FC<InferGetStaticPropsType<typeof getStaticProps>>;

const DemoGetStaticProps: PagePropsType = ({ posts }: PropsType) => {
    return (
        <div className="container">
            <h1>Demo Get StaticProps</h1>
            <Link href="/playground/getStaticProps/test">Back to Test</Link>
            <ul>
                {posts.map((post) => {
                    return <li key={post.PID}>{post.post_content}</li>;
                })}
            </ul>
        </div>
    );
};

export const getStaticProps: GetStaticProps<PropsType> = async (context) => {
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
export default DemoGetStaticProps;
