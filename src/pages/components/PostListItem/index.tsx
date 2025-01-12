import React, { useEffect, useState } from 'react';
import PostItem from '../PostItem';
import { PostType } from '@/pages';
import postServices from '../../../../servies/postService';
import Button from '../Button';
type PropsType = {
    listPosts: PostType[];
};

const pagesize: number = 3;
const PostListItem: React.FC<PropsType> = (props) => {
    const [listPosts, setListPosts] = useState(props.listPosts);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleLoadmore = () => {
        if (loading === true) {
            return;
        }
        setLoading(true);
        postServices
            .getPostsPaging({ pagesize, currPage: currentPage + 1 })
            .then((res) => {
                if (res.status === 200) {
                    const newPosts = res.posts || [];
                    setListPosts([...listPosts, ...newPosts]);
                    setCurrentPage((prevPage) => prevPage + 1);
                }
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="ass1-section__list">
            {listPosts.map((post, index) => (
                <PostItem key={post.PID} post={post} />
            ))}
            <Button
                onClick={handleLoadmore}
                // isLoading={loading}
                className="load-more ass1-btn"
            >
                <span>Xem thêm</span>
            </Button>
        </div>
    );
};

export default PostListItem;
