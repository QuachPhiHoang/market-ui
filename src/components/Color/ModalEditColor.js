// Modal.js
import { React, useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './ModalEditColor.scss';
import Button from '~/components/Button';
import { updateColor } from '~/redux/color/colorSlice';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function CustomModal({ isOpen, closeModal, onSuccess, itemId }) {
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = async () => {
        try {
            if (!name) {
                return toast.error('Please enter a name for this color', {
                    draggable: true,
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            const myForm = new FormData();
            myForm.set('name', name);
            const data = await dispatch(updateColor({ id: itemId, myForm: myForm })).unwrap();
            if (data?.success) {
                toast.success('Updated Color', { draggable: true, position: toast.POSITION.TOP_RIGHT });
            } else if (data?.errorMessage) {
                toast.error(data.errorMessage, { draggable: true, position: toast.POSITION.TOP_RIGHT });
            }
            setTimeout(() => {
                onSuccess();
            }, 1000);
        } catch (error) {
            toast.error(error, { draggable: true, position: toast.POSITION.TOP_RIGHT });
        }
    };
    return (
        <Modal
            className={cx('modal-edit')}
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <h2 className={cx('modal-edit__title')}>Update Color</h2>
            <form className={cx('modal-edit__form')}>
                <label htmlFor="name" className={cx('modal-edit__label')}>
                    Color:
                </label>
                <input
                    type="text"
                    value={name}
                    placeholder="Color Name"
                    onChange={(e) => setName(e.target.value)}
                    className={cx('modal-edit__input')}
                />
            </form>
            <div className={cx('modal-edit__btn')}>
                <Button primary large onClick={() => handleSubmit()}>
                    Update Color
                </Button>
                <Button primary large onClick={() => onSuccess()}>
                    Cancel
                </Button>
            </div>
        </Modal>
    );
}

export default CustomModal;
