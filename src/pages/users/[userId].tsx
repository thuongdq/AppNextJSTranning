import React, { useEffect } from 'react';
import UserDetailInfo from '../components/UserDetailInfo';
import UserDetailPosts from '../components/UserDetailPosts';
import { NextPage, NextPageContext } from 'next';
import { TypeUser } from '../../../state';
import { PostType } from '..';
import { getTokenSSRAndCSR, useAuthen } from '../../../helpers';
import postServices from '../../../servies/postService';
import userServices from '../../../servies/userService';
import { Promise } from 'es6-promise';
import { useRouter } from 'next/router';
interface PropType {
    userDetailInfo: TypeUser | null;
    userDetailPosts: PostType[];
}

const UserDetail: NextPage<PropType> = ({
    userDetailInfo,
    userDetailPosts,
}: PropType) => {
    // useAuthen();
    const router = useRouter();

    useEffect(() => {
        if (!userDetailInfo) {
            alert('User khong ton tai');
            router.push('/');
        }
        return () => {};
    }, []);
    return (
        <div className="container">
            <UserDetailInfo
                userDetailInfo={userDetailInfo}
                postCount={userDetailPosts.length}
            />
            <UserDetailPosts
                userDetailPosts={userDetailPosts}
                userDetailInfo={userDetailInfo}
            />
        </div>
    );
};
UserDetail.getInitialProps = async (ctx: NextPageContext) => {
    const userId = ctx.query.userId as string;
    const [token] = getTokenSSRAndCSR(ctx);
    const userPos = userServices.getUserById(userId);
    const postPos = postServices.getPostsByUserId({ token, userId });
    const [userRes, postRes] = await Promise.all([userPos, postPos]);

    return {
        userDetailInfo: userRes.user || null,
        userDetailPosts: postRes.posts || [],
    };
};
export default UserDetail;
