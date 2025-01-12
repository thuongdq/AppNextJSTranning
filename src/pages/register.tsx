import React, { useMemo, useState } from 'react';
import { handleError, useNotAuthen } from '../../helpers';
import Link from 'next/link';
import Cookies from 'js-cookie';
import userServices from '../../servies/userService';
import { useGlobalState } from '../../state';
import { useRouter } from 'next/router';
import Button from './components/Button';
const initRegisterData = {
    fullname: {
        value: '',
        error: '',
    },
    email: {
        value: '',
        error: '',
    },
    password: {
        value: '',
        error: '',
    },
    repassword: {
        value: '',
        error: '',
    },
};
function register() {
    useNotAuthen();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [registerData, setRegisterData] = useState(initRegisterData);
    const [, setToken] = useGlobalState('token');
    const [, setUserInfo] = useGlobalState('currentUser');
    const onChangeData = (key: string) => (evt: any) => {
        const value = evt.target.value;
        const error = handleError(key, value, registerData.password.value);
        setRegisterData({ ...registerData, [key]: { value, error } });
    };

    const isValidate = useMemo(() => {
        for (let key in registerData) {
            for (let key in registerData) {
                const error: string = registerData[key].error;
                if (error !== '') return false;
            }
            return true;
        }
        return true;
    }, [registerData]);

    const handleRegister = (evt: any) => {
        evt.preventDefault();
        setLoading(true);
        if (!isValidate) {
            alert('Data invalid');
            return;
        }
        const email = registerData.email.value;
        const fullname = registerData.fullname.value;
        const password = registerData.password.value;
        const repassword = registerData.repassword.value;
        const data = {
            email,
            fullname,
            password,
            repassword,
        };
        userServices
            .register(data)
            .then((res) => {
                if (res.status === 200) {
                    console.log('res = ', res);
                    setToken(res.token);
                    setUserInfo(res.user);
                    Cookies.set('token', res.token, { expires: 30 * 12 });
                } else {
                    alert(res.error);
                }
            })
            .finally(() => {
                setLoading(false);
            });
        console.log(data);
        // evt.target.submit();
    };
    return (
        <div className="ass1-login">
            <div className="ass1-login__logo">
                <a href="index.html" className="ass1-logo">
                    ZendVn Meme
                </a>
            </div>
            <div className="ass1-login__content">
                <p>Đăng ký một tài khoản</p>
                <div className="ass1-login__form">
                    <form action="#" onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                value={registerData.fullname.value}
                                onChange={onChangeData('fullname')}
                                type="text"
                                className="form-control"
                                placeholder="Tên hiển thị"
                            />
                            {registerData.fullname.error && (
                                <small className="form-text text-danger">
                                    {registerData.fullname.error}
                                </small>
                            )}
                        </div>
                        <div className="form-group">
                            <input
                                value={registerData.email.value}
                                onChange={onChangeData('email')}
                                type="email"
                                className="form-control"
                                placeholder="Email"
                            />
                            {registerData.email.error && (
                                <small className="form-text text-danger">
                                    {registerData.email.error}
                                </small>
                            )}
                        </div>
                        <div className="form-group">
                            <input
                                value={registerData.password.value}
                                onChange={onChangeData('password')}
                                type="password"
                                className="form-control"
                                placeholder="Mật khẩu"
                            />
                            {registerData.password.error && (
                                <small className="form-text text-danger">
                                    {registerData.password.error}
                                </small>
                            )}
                        </div>
                        <div className="form-group">
                            <input
                                value={registerData.repassword.value}
                                onChange={onChangeData('repassword')}
                                type="password"
                                className="form-control"
                                placeholder="Nhập lại mật khẩu"
                            />
                            {registerData.repassword.error && (
                                <small className="form-text text-danger">
                                    {registerData.repassword.error}
                                </small>
                            )}
                        </div>
                        <div className="ass1-login__send">
                            <Link href={'/login'}>Đăng nhập</Link>
                            <Button
                                isLoading={loading}
                                type="submit"
                                className="ass1-btn"
                            >
                                Đăng ký
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default register;
