import { PostType } from '@/pages';
import React from 'react';
import { useGlobalState } from '../../../../state';
import Link from 'next/link';
import PostItem from '../PostItem';
type PropsType = {
    userPosts: PostType[];
};
const HomeSidebar: React.FC<PropsType> = ({ userPosts }) => {
    // console.log('userPosts', userPosts);
    const [userInfo] = useGlobalState('currentUser');

    function renderUserPosts() {
        if (userPosts.length == 0) {
            return (
                <p>
                    Bạn chưa đăng bài viết nào. Tuy cập{' '}
                    <Link href={'post/create'}> để đăng bài viết đầu tiên</Link>
                </p>
            );
        }
        return userPosts.map((post, index) => (
            <PostItem key={post.PID} post={post} />
        ));
    }
    return (
        <aside className="ass1-aside">
            <div className="ass1-content-head__t">
                <div>Bài viết gần đây của bạn.</div>
            </div>
            {userInfo ? (
                renderUserPosts()
            ) : (
                <div>
                    Vui lòng đăng nhập để xem nội dung này
                    <Link href="/login">Đăng nhập</Link>
                </div>
            )}
        </aside>
    );
};

export default HomeSidebar;
