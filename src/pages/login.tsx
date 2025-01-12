import React, { useEffect, useState } from 'react';

import api from '../../servies/api';
import fetch_isomorphic from 'isomorphic-fetch';

import { match } from 'assert';
import { useRouter } from 'next/router';
import { useGlobalState } from '../../state';
import { useNotAuthen } from '../../helpers';
import Link from 'next/link';
import Button from './components/Button';
interface FormLogin {
    email: string;
    password: string;
}

const initFormData = {
    email: 'admin@gmail.com',
    password: '123456',
};

function login(props: any) {
    useNotAuthen();

    const [formData, setFormData] = useState<FormLogin>(initFormData);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [userInfo] = useGlobalState('currentUser');

    const errorString = router.query.error;
    useEffect(() => {
        if (errorString == 'failded') {
            alert('Đăng nhập thất bại');
            window.history.pushState({}, document.title, '/login');
        }

        if (errorString == 'changePassword') {
            alert('Đăng mật khẩu thành công. Vui lòng đăng nhập lại');
            window.history.pushState({}, document.title, '/login');
        }

        return () => {};
    }, [errorString]);

    useEffect(() => {
        console.log('userInfo in Login Page:', userInfo);
        return () => {};
    }, [userInfo]);

    // function conChange(key){
    //     return (evt: any) => {
    //         setFormData({ ...formData, [key]: evt.target.value });
    //     };
    // }

    // const conChange = (key: string) => (evt: any) => {
    //     setFormData({ ...formData, [key]: evt.target.value });
    // };

    const handleOnChange = (key: string) => (evt: any) => {
        const value = evt.target.value;
        setFormData({ ...formData, [key]: value });
    };

    // const onChangeV2 = (e: any, key: string) => {
    //     const value = e.target.value;
    //     setFormData({ ...formData, [key]: value });
    // };
    const handleSubmit = (evt: any) => {
        evt.preventDefault(); // Dừng sự kiện mặc định của form để xử lý bằng js

        // api.callJson('/member/login.php', {
        //     data: formData,
        //     method: 'POST',
        // }).then((data) => console.log('data', data));

        const body = JSON.stringify(formData);
        const method = 'POST';

        fetch_isomorphic('/api/login', {
            method,
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log('data', data);
                // Cookies.set('token', data.token, { expires: 30 });
                router.push('/');
            });
    };

    function handleSubmitForm(evt: any) {
        evt.preventDefault();
        setLoading(true);
        const formElement = evt.target;
        formElement.submit();
    }

    return (
        <div className="ass1-login">
            <div className="ass1-login__logo">
                <Link href="/" className="ass1-logo">
                    ZendVn Meme
                </Link>
            </div>

            <div className="ass1-login__content">
                <p>Đăng nhập</p>
                <div className="ass1-login__form">
                    {/* <form action="#" onSubmit={handleSubmit}> */}
                    <form
                        action="/api/login"
                        method="POST"
                        onSubmit={handleSubmitForm}
                    >
                        <input
                            // value={formData.email}
                            // onChange={handleOnChange('email')}
                            // onchange={evt:any=> onChangeV2(e, 'email')}
                            name="email"
                            type="text"
                            className="form-control"
                            placeholder="Email"
                        />
                        <input
                            // value={formData.password}
                            // onChange={handleOnChange('password')}
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Mật khẩu"
                        />
                        <div className="ass1-login__send">
                            <Link href={'/register'}>
                                Đăng ký một tài khoản
                            </Link>
                            <Button
                                type="submit"
                                className="ass1-btn"
                                isLoading={loading}
                            >
                                Đăng nhập
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default login;
