import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useGlobalState } from '../../../../state';
import { useRouter } from 'next/router';
import HeaderSearch from './HeaderSearch';
import HeaderMenu from './HeaderMenu';
function Header() {
    const router = useRouter();
    const [, setToken] = useGlobalState('token');
    const [userInfo, setUserInfo] = useGlobalState('currentUser');
    const handleLogout = () => {
        const check = window.confirm('Ban co thuc su muon logout');
        if (check) {
            Cookies.remove('token');
            setUserInfo(null);
            setToken('');
            router.push('/login');
        }
    };
    return (
        <header>
            <div className="ass1-header">
                <div className="container">
                    <Link href="/" className="ass1-logo">
                        ZendVn Meme
                    </Link>
                    <HeaderMenu />
                    <HeaderSearch />
                    <Link
                        href="/post/create"
                        className="ass1-header__btn-upload ass1-btn"
                    >
                        <i className="icon-Upvote" /> Upload
                    </Link>
                    {userInfo ? (
                        <div className="wrapper-user">
                            <Link
                                href="/users/[userId]"
                                as={`/users/${userInfo.USERID}`}
                                className="user-header"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <img
                                    src={userInfo.profilepicture}
                                    alt=""
                                    style={{
                                        width: 30,
                                        height: 30,
                                        objectFit: 'cover',
                                        borderRadius: '100%',
                                    }}
                                />
                                <span className="email">{userInfo.email}</span>
                            </Link>
                            <div onClick={handleLogout} className="logout">
                                Logout
                            </div>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="ass1-header__btn-upload ass1-btn"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
