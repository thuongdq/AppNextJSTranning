import React, { useState } from 'react';
import userServices from '../../../servies/userService';
import { useGlobalState } from '../../../state';
import { useAuthen } from '../../../helpers';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
const initState = {
    oldPassword: '',
    newPassword: '',
    reNewPassword: '',
};
function UserChangePassword() {
    useAuthen();

    const router = useRouter();
    const [formData, setFormData] = useState(initState);
    const [token, setToken] = useGlobalState('token');
    const [, setCurrentUser] = useGlobalState('currentUser');
    const handleOnChange = (key: string) => (evt: any) => {
        setFormData({ ...formData, [key]: evt.target.value });
    };
    const handleOnSubmit = (evt: any) => {
        evt.preventDefault();
        userServices.changePassword(formData, token).then((res) => {
            if ((res.status = 200)) {
                alert(res.message);
                Cookies.remove('token');
                setCurrentUser(null);
                setToken('');
                // router.push('/login?error=changePassword');
            } else {
                alert(res.error);
            }
        });
    };
    return (
        <div className="ass1-login">
            <div className="ass1-login__content">
                <p>Đổi mật khẩu</p>
                <div className="ass1-login__form">
                    <form action="#" onSubmit={handleOnSubmit}>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Mật khẩu cũ"
                            value={formData.oldPassword}
                            onChange={handleOnChange('oldPassword')}
                        />
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Mật khẩu mới"
                            value={formData.newPassword}
                            onChange={handleOnChange('newPassword')}
                        />
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Xác nhận mật khẩu mới"
                            value={formData.reNewPassword}
                            onChange={handleOnChange('reNewPassword')}
                        />
                        <div className="ass1-login__send justify-content-center">
                            <button type="submit" className="ass1-btn">
                                Gửi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserChangePassword;
