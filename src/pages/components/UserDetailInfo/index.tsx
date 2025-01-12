import React from 'react';
import { TypeUser, useGlobalState } from '../../../../state';
import Link from 'next/link';
interface PropsType {
    userDetailInfo: TypeUser | null;
    postCount?: number;
}
const UserDetailInfo: React.FC<PropsType> = ({
    userDetailInfo,
    postCount = 0,
}: PropsType) => {
    const [currentUser] = useGlobalState('currentUser');
    if (!userDetailInfo) {
        return null;
    }
    const check = currentUser?.USERID === userDetailInfo.USERID;
    return (
        <div className="ass1-head-user">
            <div className="ass1-head-user__content">
                <div className="ass1-head-user__image">
                    <img
                        src={
                            userDetailInfo.profilepicture ||
                            '/images/avatar-02.png'
                        }
                        alt={userDetailInfo.fullname}
                    />
                </div>
                <div className="ass1-head-user__info">
                    <div className="ass1-head-user__info-head">
                        <div className="ass1-head-user__name">
                            <span>{userDetailInfo.fullname}</span>
                            <i>
                                <img
                                    src="/fonts/emotion/svg/Verified.svg"
                                    alt=""
                                />
                            </i>
                        </div>
                        <div className="w-100" />
                        {check ? (
                            <>
                                <Link
                                    href="/users/password"
                                    className="ass1-head-user__btn-follow ass1-btn"
                                >
                                    Đổi mật khẩu
                                </Link>
                                <Link
                                    href="/users/profile"
                                    className="ass1-head-user__btn-follow ass1-btn"
                                >
                                    Profile
                                </Link>
                            </>
                        ) : (
                            <Link
                                href="#"
                                className="ass1-head-user__btn-follow ass1-btn"
                            >
                                Theo dõi
                            </Link>
                        )}
                        <p>{userDetailInfo.description}</p>
                    </div>
                    <div className="ass1-head-user__info-statistic">
                        <div className="ass1-btn-icon">
                            <i className="icon-Post" />
                            <span>Bài viết: {postCount}</span>
                        </div>
                        <div className="ass1-btn-icon">
                            <i className="icon-Followers" />
                            <span>Theo dõi: 0</span>
                        </div>
                        <div className="ass1-btn-icon">
                            <i className="icon-Following" />
                            <span>Đang theo dõi: 0</span>
                        </div>
                        {/* <div class="ass1-btn-icon"><i class="icon-Upvote"></i><span>Up Vote: 999999</span></div> */}
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserDetailInfo;
