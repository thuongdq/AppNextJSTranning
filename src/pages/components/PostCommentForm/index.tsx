import React, { useState } from 'react';
type PropsType = {
    hanSubmitForm: (value: string, callback: (e?: any) => void) => void;
};
const PostCommentForm: React.FC<PropsType> = ({ hanSubmitForm }) => {
    const [loading, setLoading] = useState(false);
    const [commentValue, setCommentValue] = useState('');
    const handleChangeComment = (evt: any) => {
        if (commentValue.length <= 181) {
            setCommentValue(evt.target.value);
        } else {
            // setCommentValue(evt.target.value.subString(0, 180));
        }
    };
    const handleSubmit = (evt: any) => {
        evt.preventDefault();
        if (loading) return;
        if (commentValue.trim().length !== 0) {
            setLoading(true);
            hanSubmitForm(commentValue.trim(), (e) => {
                setLoading(false);
            });
            setCommentValue('');
        } else {
            alert('Vui long nhap noi dung binh luan');
        }
    };
    return (
        <div className="ass1-add-comment">
            <form action="#" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control ttg-border-none"
                    placeholder="Thêm một bình luận"
                    value={commentValue}
                    onChange={handleChangeComment}
                />
            </form>
            <div className="ass1-add-comment__content">
                <a
                    href="#"
                    className="ass1-add-comment__btn-save ass1-btn-icon"
                >
                    <span>{180 - commentValue.length}</span>
                    <i className="icon-Submit_Tick" onClick={handleSubmit} />
                </a>
            </div>
        </div>
    );
};

export default PostCommentForm;
