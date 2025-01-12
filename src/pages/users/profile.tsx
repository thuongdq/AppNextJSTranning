import React, { useRef, useState } from 'react';
import { TypeUser, useGlobalState } from '../../../state';
import userServices from '../../../servies/userService';

function UserProfile() {
    const [token, setToken] = useGlobalState('token');
    const [currentUser, setCurrentUser] = useGlobalState('currentUser');
    const [user, setUser]: [user: TypeUser | null, setUser: any] =
        useState(currentUser);
    const [objFile, setObjFile] = useState({ file: null, base64URL: '' });
    const inputFileElement = useRef(null);

    const handleOnChange = (key: string) => (evt: any) => {
        setUser({ ...user, [key]: evt.target.value });
    };
    const handleSelectFile = (evt: any) => {
        console.log(inputFileElement);
        inputFileElement.current?.click();
    };
    const handleChangeFile = (evt: any) => {
        console.log(evt.target.files);
        const listFiles = evt.target.files;
        if (listFiles.length === 0) return;

        const file = listFiles[0] as File;
        if (/\/(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(file.type)) {
            console.log(file);
            const reader = new FileReader();
            reader.addEventListener(
                'load',
                () => {
                    console.log('BASE64: ', reader.result);
                    setObjFile({
                        file,
                        base64URL: reader.result as string,
                    });
                },
                false
            );
            reader.readAsDataURL(file);
        } else {
            alert('file khong hop le');
        }
    };

    const avatarURL =
        objFile.base64URL || user?.profilepicture || '/images/avatar-02.png';

    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        const data = {
            fullname: user?.fullname || '',
            gender: user?.gender || '',
            description: user?.description || '',
            avatar: objFile.file,
        };
        userServices.updateProfile(data, token as string).then((res) => {
            if (res.status == 200) {
                setCurrentUser(res.user);
                alert('Thay doi thong tin thanh cong');
            } else {
                alert(res.error);
            }
            console.log(res);
        });
    };

    return (
        <div className="ass1-login">
            <div className="ass1-login__content">
                <p>Profile</p>
                <div className="ass1-login__form">
                    <div className="avatar" onClick={handleSelectFile}>
                        <img src={avatarURL} alt="" />
                    </div>
                    <form action="#" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Tên ..."
                            value={user?.fullname}
                            onChange={handleOnChange('fullname')}
                        />
                        <select
                            className="form-control"
                            onChange={handleOnChange('gender')}
                        >
                            <option value="">Giới tính</option>
                            <option value={'Nam'}>Nam</option>
                            <option value={'Nữ'}>Nữ</option>
                        </select>
                        <input
                            type="file"
                            name="avatar"
                            placeholder="Ảnh đại diện"
                            className="form-control"
                            ref={inputFileElement}
                            style={{ display: 'none' }}
                            onChange={handleChangeFile}
                        />
                        <textarea
                            className="form-control"
                            cols={30}
                            rows={5}
                            placeholder="Mô tả ngắn ..."
                            value={user?.description}
                            onChange={handleOnChange('description')}
                        />
                        <div className="ass1-login__send justify-content-center">
                            <button type="submit" className="ass1-btn">
                                Cập nhật
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
