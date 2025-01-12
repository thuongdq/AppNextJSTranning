import React, { JSX, useEffect, useRef, useState } from 'react';

type ModalProps = {
    children: any;
    isvisible?: boolean;
    isRenderHeader?: boolean;
    isRenderCloseIcon?: boolean;
    btnCancelText?: string;
    btnOkText?: string;
    onOK?: Function;
    onCancel?: Function;
    renderFooter?: () => void;
};

const CLASS_DEFAULT = 'modal__wrapper';
const ModalSolution: React.FC<ModalProps> = ({
    children,
    isvisible = false,
    isRenderHeader = true,
    isRenderCloseIcon = true,
    btnCancelText = 'Cancel',
    btnOkText = 'OK',
    onOK,
    onCancel,
    renderFooter,
}: any) => {
    const [className, setClassName] = useState(CLASS_DEFAULT);

    useEffect(() => {
        if (isvisible === true) {
            setClassName((oldClass) => oldClass + ' show');
            if (typeof document !== 'undefined') {
                document?.querySelector('body')?.classList.add('modal__open');
            }
        } else {
            setClassName(CLASS_DEFAULT);
            if (typeof document !== 'undefined') {
                document
                    ?.querySelector('body')
                    ?.classList.remove('modal__open');
            }
        }
    }, [isvisible]);

    useEffect(() => {
        function handler(evt: any) {
            if (evt.keyCode === 27) {
                onCancel();
            }
        }
        document.addEventListener('keyup', handler);
        return () => {
            document.removeEventListener('keyup', handler);
        };
    }, []);

    const _renderFooter = (): JSX.Element => {
        if (renderFooter) {
            return renderFooter();
        } else {
            return (
                <>
                    <button className="modal__cancel" onClick={onCancel}>
                        {btnCancelText}
                    </button>
                    <button className="modal__ok" onClick={onOK}>
                        {btnOkText}
                    </button>
                </>
            );
        }
        return <p></p>;
    };

    if (isvisible === false) {
        return null;
    }
    return (
        <div className={className}>
            <div className="mask" onClick={onCancel}></div>
            <div className="dialog">
                <div className="modal__content">
                    {isRenderHeader && (
                        <div className="modal__header">
                            Title Modal
                            {isRenderCloseIcon && (
                                <button
                                    onClick={onCancel}
                                    className="modal__close"
                                >
                                    X
                                </button>
                            )}
                        </div>
                    )}
                    <div className="modal__body">{children}</div>
                    <div className="modal__footer">{_renderFooter()}</div>
                </div>
            </div>
        </div>
    );
};

export default ModalSolution;
