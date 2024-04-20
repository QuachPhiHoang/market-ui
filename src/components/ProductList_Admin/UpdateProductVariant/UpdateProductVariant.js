import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import Sidebar from './Sidebar';
import { Modal, ModalDialog, ModalClose, Typography, Button, Box } from '@mui/joy';
import classNames from 'classnames/bind';
import styles from './UpdateProductVariant.scss';
import { getAllSize } from '~/redux/size/sizeSlice';
import { getAllColor } from '~/redux/color/colorSlice';
import { getVariant, updateVariant, reset, deleteVariant } from '~/redux/variant/variantSlice';

import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function UpdateProductVariant() {
    const { id } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [stock, setStock] = useState(0);

    const { sizes } = useSelector((state) => state.sizes);
    const { colors } = useSelector((state) => state.colors);
    const { variant, isUpdate, isDeleted } = useSelector((state) => state.variants);

    useEffect(() => {
        dispatch(getAllColor());
        dispatch(getAllSize());
        dispatch(getVariant(id));
    }, [dispatch, id]);
    useEffect(() => {
        if (Object.keys(variant)?.length) {
            setSize(variant?.size?._id);
            setColor(variant?.color?._id);
            setStock(variant?.stock);
        }
        if (isUpdate) {
            toast.success('Update Successfully');
            setTimeout(() => {
                navigate(-1);
                dispatch(reset());
            }, 2000);
        }
        if (isDeleted) {
            toast.success('Delete successfully');
            setTimeout(() => {
                navigate(-1);
                dispatch(reset());
            }, 2000);
        }
    }, [dispatch, isDeleted, isUpdate, navigate, variant]);

    const handleClose = () => {
        navigate(-1);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set('size', size);
        myForm.set('color', color);
        myForm.set('stock', stock);

        dispatch(updateVariant({ id, myForm }));
    };

    const deleteProductHandler = (id) => {
        dispatch(deleteVariant(id));
    };

    return (
        <Modal onClose={handleClose} open>
            <>
                <ModalDialog sx={{ maxHeight: '100vh' }}>
                    <ModalClose />
                    <Typography
                        level="h1"
                        sx={{ textTransform: 'capitalize', textAlign: 'center', fontSize: 32, fontWeight: 600 }}
                    >
                        {location.pathname.split('/').reverse()[0]}
                    </Typography>
                    {location.pathname.split('/').reverse()[0] === 'edit-variant' ? (
                        <div>
                            <form className={cx('form__container')} onSubmit={(e) => handleSubmit(e)}>
                                <label htmlFor={`sizeSelect`} className={cx('form__container__label')}>
                                    Size:
                                </label>
                                <select
                                    required
                                    id={`sizeSelect`}
                                    className={cx('form__container__select')}
                                    onChange={(e) => setSize(e.target.value)}
                                    value={size}
                                >
                                    <option value="">Choose Size </option>

                                    {sizes.length > 0 &&
                                        sizes.map((size) => (
                                            <option key={size._id} value={size._id}>
                                                {size.name}
                                            </option>
                                        ))}
                                </select>

                                <label className={cx('form__container__label')} htmlFor={`colorSelect`}>
                                    Color:
                                </label>
                                <select
                                    required
                                    id={`colorSelect`}
                                    className={cx('form__container__select')}
                                    onChange={(e) => setColor(e.target.value)}
                                    value={color}
                                >
                                    <option value="">Choose Color</option>

                                    {colors.length > 0 &&
                                        colors.map((color) => (
                                            <option key={color._id} value={color._id}>
                                                {color.name}
                                            </option>
                                        ))}
                                </select>
                                <label className={cx('form__container__label')}>Stock</label>
                                <input
                                    required
                                    value={stock}
                                    type="number"
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </form>

                            <button onClick={(e) => handleSubmit(e)} className={cx('form__container__btn-create')}>
                                Update
                            </button>
                        </div>
                    ) : (
                        <>
                            <Typography textColor="text.tertiary" sx={{ fontSize: 24 }}>
                                Are you sure you want to delete this student?
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    gap: 1,
                                    justifyContent: 'flex-end',
                                    pt: 2,
                                }}
                            >
                                <Button onClick={handleClose} variant="plain" color="neutral" sx={{ fontSize: 16 }}>
                                    Cancel
                                </Button>

                                <Button
                                    type="submit"
                                    variant="solid"
                                    color="danger"
                                    sx={{ fontSize: 16 }}
                                    onClick={() => deleteProductHandler(id)}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </>
                    )}
                </ModalDialog>
                <ToastContainer draggable={false} position="top-right" autoClose={3000} />
            </>
        </Modal>
    );
}

export default UpdateProductVariant;
