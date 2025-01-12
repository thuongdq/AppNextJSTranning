import React from 'react';
import { useGlobalState } from '../../../../state';
import Button from '../Button';
type PropsType = {
    category: string[];
    onChangeDetailForm: (key: string, value: string[]) => void;
    handleSubmitPost: () => void;
    loading: boolean;
};
const PostDetailSidebar: React.FC<PropsType> = ({
    category = [],
    onChangeDetailForm,
    handleSubmitPost,
    loading = false,
}) => {
    const [listCategories] = useGlobalState('categories');
    const handleOnChange = (evt: any) => {
        const isChecked = evt.target.checked;
        const value = evt.target.value;
        const findIdx = category.findIndex((cateId) => cateId === value);
        const isExist = findIdx !== -1;
        if (!isExist && isChecked) {
            onChangeDetailForm('category', [...category, value]);
        } else {
            onChangeDetailForm(
                'category',
                category.filter((id) => id !== value)
            );
        }
    };
    return (
        <aside className="ass1-aside ass1-aside__edit-post">
            <div>
                <Button
                    isLoading={loading}
                    onClick={handleSubmitPost}
                    className="ass1-btn"
                >
                    Đăng bài
                </Button>
            </div>
            <div className="ass1-aside__edit-post-head">
                <span
                    style={{
                        display: 'block',
                        width: '100%',
                        marginBottom: 10,
                    }}
                >
                    Chọn danh mục
                </span>
                {listCategories.map((item: any, index: number) => {
                    const findIdx = category.findIndex(
                        (cateId) => cateId == item.id.toString()
                    );
                    return (
                        <label className="ass1-checkbox" key={index}>
                            <input
                                type="checkbox"
                                name="category"
                                value={item.id}
                                onChange={handleOnChange}
                                checked={findIdx !== -1 ? true : false}
                            />
                            <span />
                            <p>{item.text}</p>
                        </label>
                    );
                })}
            </div>
            <div className="ass1-aside__get-code">
                <p>Share Link</p>
            </div>
            <div className="ass1-aside__social">
                <a
                    href=""
                    className="ass1-btn-social__facebook ass1-btn-social"
                >
                    <i className="fa fa-facebook" aria-hidden="true" />
                </a>
                <a href="" className="ass1-btn-social__twitter ass1-btn-social">
                    <i className="fa fa-twitter" aria-hidden="true" />
                </a>
                <a href="" className="ass1-btn-social__google ass1-btn-social">
                    <i className="fa fa-google-plus" aria-hidden="true" />
                </a>
            </div>
        </aside>
    );
};

export default PostDetailSidebar;
