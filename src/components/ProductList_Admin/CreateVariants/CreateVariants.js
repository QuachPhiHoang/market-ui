import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import Sidebar from './Sidebar';
import { Modal, ModalDialog, ModalClose, Typography } from '@mui/joy';
import classNames from 'classnames/bind';
import styles from './CreateVariants.scss';
import { getAllSize } from '~/redux/size/sizeSlice';
import { getAllColor } from '~/redux/color/colorSlice';
import { createVariant } from '~/redux/variant/variantSlice';

// import { Button } from '@mui/joy';

import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function CreateVariant() {
    const { id } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formCount, setFormCount] = useState(1);
    const [formOptions, setFormOptions] = useState([{ size: '', color: '', stock: 0 }]);

    // const sizes = ['Small', 'Medium', 'Large'];
    // const colors = ['Red', 'Green', 'Blue'];
    const { sizes } = useSelector((state) => state.sizes);
    const { colors } = useSelector((state) => state.colors);
    useEffect(() => {
        dispatch(getAllColor());
        dispatch(getAllSize());
    }, [dispatch]);

    const handleAddForm = () => {
        setFormCount((prevCount) => prevCount + 1);
        setFormOptions((prevOptions) => [...prevOptions, { size: '', color: '', stock: 0 }]);
    };

    const handleSizeChange = (index, event) => {
        const { value } = event.target;

        setFormOptions((prevOptions) => {
            const updatedOptions = [...prevOptions];
            updatedOptions[index] = { ...updatedOptions[index], size: value };
            return updatedOptions;
        });
    };

    const handleColorChange = (index, event) => {
        const { value } = event.target;

        setFormOptions((prevOptions) => {
            const updatedOptions = [...prevOptions];
            updatedOptions[index] = { ...updatedOptions[index], color: value };
            return updatedOptions;
        });
    };
    const handleStockChange = (index, event) => {
        const { value } = event.target;
        setFormOptions((prevOptions) => {
            const updateOptions = [...prevOptions];
            updateOptions[index] = { ...updateOptions[index], stock: value };
            return updateOptions;
        });
    };

    const handleClose = () => {
        navigate(-1);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let isError = true;
        formOptions.forEach((item) => {
            if (!item.color || !item.size || !item.stock) {
                isError = false;
            }
        });
        if (isError === false) {
            toast.error('Please Enter Value');
        } else {
            try {
                const data = await dispatch(createVariant({ id, vars: JSON.stringify(formOptions) })).unwrap();
                if (data.success) {
                    toast.success('Variants Created Successfully');
                    setTimeout(() => {
                        navigate(-1);
                    }, [2000]);
                }
                if (data.errorMessage) {
                    toast.error(data.errorMessage);
                }
            } catch (error) {
                return toast.error(error);
            }
        }
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
                    <div>
                        <button className={cx('form__container__btn-add')} onClick={handleAddForm}>
                            Add Form
                        </button>

                        {[...Array(formCount)].map((_, index) => (
                            <form key={index} className={cx('form__container')} onSubmit={(e) => handleSubmit(e)}>
                                <label htmlFor={`sizeSelect${index + 1}`} className={cx('form__container__label')}>
                                    Size:
                                </label>
                                <select
                                    required
                                    id={`sizeSelect${index + 1}`}
                                    className={cx('form__container__select')}
                                    onChange={(event) => handleSizeChange(index, event)}
                                    value={formOptions[index]?.size || ''}
                                >
                                    <option value="">Select Size</option>

                                    {sizes.length > 0 &&
                                        sizes.map(
                                            (size) =>
                                                !formOptions.some(
                                                    (option, i) =>
                                                        i !== index &&
                                                        option.color === formOptions[index].color &&
                                                        option.size === size._id,
                                                ) && (
                                                    <option key={size._id} value={size._id}>
                                                        {size.name}
                                                    </option>
                                                ),
                                        )}
                                </select>

                                <label className={cx('form__container__label')} htmlFor={`colorSelect${index + 1}`}>
                                    Color:
                                </label>
                                <select
                                    required
                                    id={`colorSelect${index + 1}`}
                                    className={cx('form__container__select')}
                                    onChange={(event) => handleColorChange(index, event)}
                                    value={formOptions[index]?.color || ''}
                                >
                                    <option value="">Select Color</option>

                                    {colors.length > 0 &&
                                        colors.map(
                                            (color) =>
                                                !formOptions.some(
                                                    (option, i) =>
                                                        i !== index &&
                                                        option.size === formOptions[index].size &&
                                                        option.color === color._id,
                                                ) && (
                                                    <option key={color._id} value={color._id}>
                                                        {color.name}
                                                    </option>
                                                ),
                                        )}
                                </select>
                                <label className={cx('form__container__label')}>Stock</label>
                                <input required type="number" onChange={(event) => handleStockChange(index, event)} />
                            </form>
                        ))}

                        <button className={cx('form__container__btn-create')} onClick={(e) => handleSubmit(e)}>
                            Create
                        </button>
                    </div>
                </ModalDialog>
                <ToastContainer draggable={false} position="top-right" autoClose={3000} />
            </>
        </Modal>
    );
}

export default CreateVariant;
