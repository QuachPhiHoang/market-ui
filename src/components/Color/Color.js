import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './Color.scss';
import Button from '~/components/Button';
import { createColor, reset } from '~/redux/color/colorSlice';
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '~/components/SideBar/Sidebar';

const cx = classNames.bind(styles);
function Color() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');

    const handleCreated = async (e) => {
        try {
            e.preventDefault();

            const myForm = new FormData();
            if (name === '') {
                return toast.error('Please enter the name of color', {
                    draggable: true,
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
            myForm.set('name', name);
            const data = await dispatch(createColor(myForm)).unwrap();

            if (data?.success) {
                toast.success('Color created successfully');
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
        <div className={cx('create-color')}>
            <Sidebar />
            <div className={cx('create-color__container')}>
                <form onSubmit={handleCreated} className={cx('create-color__form')} encType="multipart/form-data">
                    <div className={cx('create-color__title')}>Create color</div>
                    <div className={cx('create-color__item')}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Color Name"
                        />
                    </div>
                    <Button primary className={cx('create-color__form__btn')} onClick={handleCreated}>
                        Create
                    </Button>
                </form>
                <ToastContainer draggable={false} position="top-right" autoClose={3000} />
            </div>
        </div>
    );
}

export default Color;
