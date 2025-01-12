import { PostType } from '@/pages';
import React from 'react';
import PostItem from '../PostItem';
import Masonry from 'react-masonry-component';
import { TypeUser, useGlobalState } from '../../../../state';

interface PropsType {
    userDetailPosts: PostType[];
    userDetailInfo: TypeUser | null;
}
const UserDetailPosts: React.FC<PropsType> = ({
    userDetailPosts,
    userDetailInfo,
}) => {
    const [currentUser] = useGlobalState('currentUser');
    const checkIsOwner = currentUser?.USERID === userDetailInfo?.USERID;

    const childElements = userDetailPosts.map(function (post) {
        return (
            <PostItem
                post={post}
                key={post.PID}
                customClass="col-lg-6"
                isOwner={checkIsOwner}
            />
        );
    });

    return (
        <>
            <div className="container">
                {/* <Masonry
                    className={
                        'ass1-section__wrap row ass1-section__isotope-init'
                    } // default ''
                > */}
                {childElements}
                {/* </Masonry> */}
            </div>
        </>
    );
};

export default UserDetailPosts;
