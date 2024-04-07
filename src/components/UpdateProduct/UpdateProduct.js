import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import Sidebar from './Sidebar';
import { Modal, ModalDialog, ModalClose, Typography, Box } from '@mui/joy';
import classNames from 'classnames/bind';
import styles from './UpdateProduct.scss';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MaleIcon from '@mui/icons-material/Male';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { Button } from '@mui/joy';

// import Button from '~/components/Button';
import { getProductDetail } from '~/redux/product-modal/productDetailSlice';
import { updateProduct, deleteProducts } from '~/redux/product-modal/productsSlice';
import { reset } from '~/redux/product-modal/productsSlice';
import { ToastContainer, toast } from 'react-toastify';

const cx = classNames.bind(styles);

function UpdateProduct() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const inputRef = useRef();

    const { product } = useSelector((state) => state.productDetailSlice);
    const { isUpdated, isDeleted } = useSelector((state) => state.products);

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState('');
    const [sale, setSale] = useState(0);
    const [category, setCategory] = useState('');
    const [gender, setGender] = useState('');
    const [size, setSize] = useState([]);
    const [color, setColor] = useState([]);
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    // const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const categories = ['Áo Thun', 'Áo Sơ Mi', 'Áo Polo', 'Áo Hoodie', 'Áo Khoác', 'Quần Jean'];
    const genders = ['Female', 'Male'];
    // const [newPrice, setNewPrice] = useState(0);
    const handleClose = () => {
        navigate(-1);
    };

    const pushToArray = (items) => {
        const item = [];
        const data = items.split(',');
        item.push(data);
        return item;
    };

    useEffect(() => {
        if (product && product?.product?._id !== id) {
            dispatch(getProductDetail(id));
        } else {
            setName(product?.product.name);
            setDesc(product?.product.desc);
            setPrice(product?.product.price);
            setCategory(product?.product.category);
            setStock(product?.product.stock);
            setImagesPreview(product?.product.images);
            // setOldImages(product?.product.images);
            setGender(product?.product.gender);
            setSize(product?.product.size);
            setColor(product?.product.colors);
        }

        if (isUpdated) {
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
    }, [dispatch, isUpdated, id, product, navigate, isDeleted]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('name', name);
        myForm.set('price', price);
        myForm.set('desc', desc);
        myForm.set('category', category);
        myForm.set('gender', gender);
        myForm.set('sale', sale);
        myForm.set('size', size);
        myForm.set('colors', color);
        myForm.set('stock', stock);
        images.forEach((image) => {
            myForm.append('images', image);
        });

        dispatch(updateProduct({ id: id, myForm: myForm }));
    };
    const deleteProductHandler = (id) => {
        dispatch(deleteProducts(id));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
        console.log('files', files);
        // setImages([]);
        // setImagesPreview([]);
        // setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    // setImagesPreview((old) => console.log('imgReview', [...old]));
                    setImagesPreview([reader.result]);
                    setImages((old) => [...old]);
                }
            };

            reader.readAsDataURL(file);
        });
    };
    return (
        <Modal onClose={handleClose} open>
            <ModalDialog sx={{ maxHeight: '100vh' }}>
                <ModalClose />
                <Typography
                    level="h1"
                    sx={{ textTransform: 'capitalize', textAlign: 'center', fontSize: 32, fontWeight: 600 }}
                >
                    {location.pathname.split('/').reverse()[0]} Product
                </Typography>
                {location.pathname.split('/').reverse()[0] === 'edit' ? (
                    <form
                        className={cx('update-product__container__form')}
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <div className={cx('update-product__container__form__name')}>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={cx('update-product__container__form__price')}>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className={cx('update-product__container__form__description')}>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Product Description"
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div className={cx('update-product__container__form__category')}>
                            <AccountTreeIcon />
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={cx('update-product__container__form__gender')}>
                            <MaleIcon />
                            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value="">Choose Gender</option>
                                {genders.map((gender) => (
                                    <option key={gender} value={gender}>
                                        {gender}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('update-product__container__form__name')}>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Size"
                                required
                                value={size}
                                onChange={(e) => setSize(pushToArray(e.target.value))}
                            />
                        </div>
                        <div className={cx('update-product__container__form__name')}>
                            <FormatColorTextIcon />
                            <input
                                type="text"
                                placeholder="Product Color"
                                required
                                value={color}
                                onChange={(e) => setColor(pushToArray(e.target.value))}
                            />
                        </div>

                        <div className={cx('update-product__container__form__stock')}>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="Stock"
                                value={stock}
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div className={cx('update-product__container__form__sale')}>
                            <LoyaltyIcon />
                            <input
                                type="text"
                                placeholder="Sale"
                                value={sale}
                                required
                                onChange={(e) => setSale(e.target.value)}
                            />
                        </div>

                        <div id="createProductFormFile" className={cx('update-product__container__form__img')}>
                            <AttachFileIcon />
                            <label htmlFor="updateImages">Choose Images</label>
                            {/* {images?.length && <p>{images?.length} is Selected</p>} */}
                            <input
                                ref={inputRef}
                                id="updateImages"
                                type="file"
                                name="images-product"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                required
                                multiple
                            />
                        </div>
                        {/* <div
                            id="createProductFormImage"
                            className={cx('update-product__container__form__old__img-review')}
                        >
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Product Preview" />
                                ))}
                        </div> */}

                        <div id="createProductFormImage" className={cx('update-product__container__form__img-review')}>
                            {imagesPreview &&
                                imagesPreview.map((image, index) => (
                                    <img key={index} src={image.url} alt="Product Preview" />
                                ))}
                        </div>

                        <Button
                            className={cx('update-product__container__form__btn')}
                            onClick={updateProductSubmitHandler}
                        >
                            <span>Update</span>
                        </Button>
                    </form>
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
                <ToastContainer draggable={false} position="top-right" autoClose={3000} />
            </ModalDialog>
        </Modal>
    );
}

export default UpdateProduct;
