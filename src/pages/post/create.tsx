import React, { useState } from 'react';
import PostDetailForm from '../components/PostDetailForm';
import PostDetailSidebar from '../components/PostDetailSidebar';
import { useAuthen } from '../../../helpers';
import postServices from '../../../servies/postService';
import { useGlobalState } from '../../../state';
type PropsType = {
    url_image: string;
    post_content: string;
    category: string[];
    obj_image: {
        file: File | null;
        base64URL: string;
    };
};
const initState: PropsType = {
    url_image: '',
    post_content: '',
    category: [],
    obj_image: {
        file: null,
        base64URL: '',
    },
};
const create: React.FC<PropsType> = () => {
    useAuthen();
    const [loading, setLoading] = useState(false);
    const [token] = useGlobalState('token');
    const [postData, setPostData] = useState(initState);

    const onChangeDetailForm = (key: String, value: any) => {
        setPostData({ ...postData, [key]: value });
    };

    const handleSubmitPost = () => {
        setLoading(true);
        postServices
            .createNewPost(postData, token as string)
            .then((res) => {
                if (res.status == 200) {
                    alert('Dang bai viet thanh cong');
                } else {
                    alert(res.error);
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    console.log('new category', postData);
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <PostDetailForm
                        url_image={postData.url_image}
                        post_content={postData.post_content}
                        obj_image={postData.obj_image}
                        onChangeDetailForm={onChangeDetailForm}
                    />
                </div>
                <div className="col-lg-4">
                    <PostDetailSidebar
                        handleSubmitPost={handleSubmitPost}
                        category={postData.category}
                        onChangeDetailForm={onChangeDetailForm}
                        loading={loading}
                    />
                </div>
            </div>
        </div>
    );
};

export default create;
