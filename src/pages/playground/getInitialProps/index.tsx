import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';

const BASE_URL = 'http://apiluc.zendvn.com/api';
const API_KEY = '';
let isRun = false;

type PostType = {
    PID: string;
    post_content: string;
};
type PropsType = {
    posts: PostType[];
};
const GetInitialProps: NextPage<PropsType> = ({ posts }: PropsType) => {
    return (
        <div className="container">
            <h1>FETCH</h1>
            <Link href="/playground/getInitialProps/test">Back to Test</Link>
            <ul>
                {posts.map((post: any) => {
                    return <li key={post.USERID}>{post.fullname}</li>;
                })}
            </ul>
        </div>
    );
};

GetInitialProps.getInitialProps = async (context: NextPageContext) => {
    const response = await fetch(
        BASE_URL + '/post/getListPagination.php?pagesize=10&currPage=1'
    );
    const data = await response.json();

    return {
        posts: data.posts,
    };
};
export default GetInitialProps;
