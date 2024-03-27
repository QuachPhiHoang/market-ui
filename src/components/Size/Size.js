import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Size.scss';
import Button from '~/components/Button';
import { createSize, reset } from '~/redux/size/sizeSlice';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '~/components/SideBar/Sidebar';

const cx = classNames.bind(styles);
function Size() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const handleCreated = async (e) => {
        try {
            e.preventDefault();

            const myForm = new FormData();
            if (name === '') {
                return toast.error('Please enter the name of size', {
                    draggable: true,
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            myForm.set('name', name);
            const data = await dispatch(createSize(myForm)).unwrap();

            if (data?.success) {
                toast.success('Size created successfully', { draggable: true, position: toast.POSITION.TOP_RIGHT });
                setTimeout(() => {
                    navigate('/admin/dashboard');
                }, 3000);
                dispatch(reset());
            }
            if (data?.errorMessage) {
                toast.error(data.errorMessage, { draggable: true, position: toast.POSITION.TOP_RIGHT });
            }
        } catch (error) {
            toast.error(error, { draggable: true, position: toast.POSITION.TOP_RIGHT });
        }
    };
    return (
        <div className={cx('create-size')}>
            <Sidebar />
            <div className={cx('create-size__container')}>
                <form onSubmit={handleCreated} className={cx('create-size__form')} encType="multipart/form-data">
                    <div className={cx('create-size__title')}>Create Size</div>
                    <div className={cx('create-size__item')}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Size Name"
                        />
                    </div>
                    <Button primary className={cx('create-size__form__btn')} onClick={handleCreated}>
                        Create
                    </Button>
                </form>
                <ToastContainer draggable={false} position="top-right" autoClose={3000} />
            </div>
        </div>
    );
}

export default Size;
