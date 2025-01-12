import React, { useState } from 'react';
import ModalSolution from './components/ModalSolution';

function modal() {
    const [openModal, setOpenModal]: [
        openModal: boolean,
        setOpenModal: Function
    ] = useState(false);
    return (
        <div className="container">
            {openModal === true && (
                <ModalSolution
                    isvisible={openModal}
                    isRenderHeader={true}
                    btnOkText="Submit"
                    onCancel={() => {
                        setOpenModal(false);
                    }}
                    onOK={() => {
                        // console.log('====================================');
                        // console.log('submit Form');
                        // console.log('====================================');
                    }}
                >
                    <h2>Demo Modal</h2>
                    <form action="">
                        <input type="text" placeholder="232" />
                    </form>
                </ModalSolution>
            )}
            <button
                onClick={() => {
                    setOpenModal(true);
                }}
            >
                Open Modal
            </button>
        </div>
    );
}

export default modal;
