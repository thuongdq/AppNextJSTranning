import { PostType } from '@/pages';
import Link from 'next/link';
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';
import { hightlightText } from '../../../../helpers/ultils';
type PropsType = {
    post?: PostType;
    customClass?: string;
    isHightlight?: boolean;
    query?: string;
    isOwner?: boolean;
};
dayjs.extend(relativeTime);
dayjs.locale('vi');

const PostItem: React.FC<PropsType> = ({
    post,
    customClass = '',
    isHightlight = false,
    query = '',
    isOwner = false,
}: PropsType) => {
    // console.log('isOwner', isOwner);

    const timeFormart = dayjs(post?.time_added).fromNow();

    if (!post) return false;
    return (
        <div className={`ass1-section__item ${customClass}`}>
            <div className="ass1-section">
                <div className="ass1-section__head">
                    <Link
                        href="/users/[userId]"
                        as={`/users/${post.USERID}`}
                        className="ass1-section__avatar ass1-avatar"
                    >
                        <img
                            src={
                                post?.profilepicture || '/images/avatar-02.jpg'
                            }
                            alt=""
                        />
                    </Link>
                    <div>
                        <Link
                            href={`/users/[userId]`}
                            as={`/users/${post.USERID}`}
                            className="ass1-section__name"
                            dangerouslySetInnerHTML={{
                                __html: isHightlight
                                    ? hightlightText(post.fullname, query)
                                    : post.fullname,
                            }}
                        />
                        <span className="ass1-section__passed">
                            {timeFormart}
                        </span>
                    </div>
                </div>
                <div className="ass1-section__content">
                    test====
                    <p
                        dangerouslySetInnerHTML={{
                            __html: isHightlight
                                ? hightlightText(post.post_content, query)
                                : post.post_content,
                        }}
                    />
                    <div className="ass1-section__image">
                        <Link
                            href={`/post/[postId]${isOwner ? '/edit' : ''}`}
                            as={`/post/${post.PID}${isOwner ? '/edit' : ''}`}
                        >
                            <img
                                src={
                                    post.url_image ||
                                    'images/microphone-1209816_1920.jpg'
                                }
                                alt=""
                            />
                        </Link>
                    </div>
                </div>
                <div className="ass1-section__footer">
                    <Link
                        href="/post/[postId]"
                        as={`/post/${post.PID}`}
                        className="ass1-section__btn-comment ass1-btn-icon"
                    >
                        <i className="icon-Comment_Full" />
                        <span>{post.count || 0}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PostItem;
