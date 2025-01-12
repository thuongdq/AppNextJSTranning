import React, { useRef, useState } from 'react';

type PropsType = {
    url_image: string;
    post_content: string;
    obj_image: {
        file: File | null;
        base64URL: string;
    };
    onChangeDetailForm: (key: string, value: any) => void;
};
const PostDetailForm: React.FC<PropsType> = ({
    url_image,
    post_content,
    obj_image,
    onChangeDetailForm,
}) => {
    const inputFileElement = useRef(null);

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
                    onChangeDetailForm('obj_image', {
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
    const handleSelectFile = (evt: any) => {
        evt.preventDefault();
        console.log(inputFileElement);
        inputFileElement.current?.click();
    };

    const handleOnChange = (key: string) => (evt: any) => {
        const value = evt.target.value;
        onChangeDetailForm(key, value);
    };

    const imageURL =
        url_image || obj_image?.base64URL || '/images/no_image_available.jpg';
    console.log(obj_image);
    return (
        <div className="ass1-section ass1-section__edit-post">
            <div className="ass1-section__content">
                <form action="#">
                    <div className="form-group">
                        <input
                            value={url_image}
                            onChange={handleOnChange('url_image')}
                            type="text"
                            className="form-control ttg-border-none"
                            placeholder="https://"
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            value={post_content}
                            onChange={handleOnChange('post_content')}
                            className="form-control ttg-border-none"
                            placeholder="Mô tả ..."
                        />
                    </div>
                </form>
                <input
                    type="file"
                    ref={inputFileElement}
                    style={{ display: 'none' }}
                    onChange={handleChangeFile}
                />
                <div className="ass1-section__image">
                    <a href="#">
                        <img src={imageURL} alt="default" />
                    </a>
                </div>
                <a
                    href="https://memeful.com/"
                    target="_blank"
                    className="ass1-btn ass1-btn-meme"
                >
                    Chế ảnh từ meme
                </a>
                <a
                    href="#"
                    className="ass1-btn ass1-btn-meme"
                    onClick={handleSelectFile}
                >
                    Đăng ảnh từ máy tính
                </a>
            </div>
        </div>
    );
};

export default PostDetailForm;
