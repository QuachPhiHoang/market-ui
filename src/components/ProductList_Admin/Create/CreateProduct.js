import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import Sidebar from '../../SideBar/Sidebar';
import classNames from 'classnames/bind';
import styles from './CreateProduct.scss';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MaleIcon from '@mui/icons-material/Male';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import InventoryIcon from '@mui/icons-material/Inventory';
import Button from '~/components/Button';

import { createProduct } from '~/redux/product-modal/productsSlice';

const cx = classNames.bind(styles);

function CreateProduct() {
    // const { isSuccess } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [price, setPrice] = useState(0);
    const [desc, setDesc] = useState('');
    const [sale, setSale] = useState(0);
    const [category, setCategory] = useState('');
    const [gender, setGender] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState([]);
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const categories = ['Áo Thun', 'Áo Sơ Mi', 'Áo Polo', 'Áo Hoodie', 'Áo Khoác', 'Quần Jean'];
    const genders = ['Female', 'Male'];
    const navigate = useNavigate();

    const convertStringToArray = (items) => {
        return items.replace(' ', '').split(',');
    };

    const createProductSubmitHandler = async (e) => {
        e.preventDefault();

        const myForm = new FormData();

        const formatSize = convertStringToArray(size);
        const formatColor = convertStringToArray(color);

        myForm.set('name', name);
        myForm.set('SKU', sku);
        myForm.set('price', price);
        myForm.set('desc', desc);
        myForm.set('category', category);
        myForm.set('gender', gender);
        myForm.set('sale', sale);
        myForm.set('stock', stock);
        formatSize.forEach((i) => {
            myForm.append('size', i);
        });
        formatColor.forEach((i) => {
            myForm.append('colors', i);
        });
        images.forEach((image) => {
            myForm.append('images', image);
        });
        const data = await dispatch(createProduct(myForm)).unwrap();
        if (data.success) {
            toast.success('Product Created Successfully');
            navigate('/admin/products');
        }
    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };
    return (
        <div className={cx('create-product')}>
            <Sidebar />
            <div className={cx('create-product__container')}>
                <form
                    className={cx('create-product__container__form')}
                    encType="multipart/form-data"
                    onSubmit={createProductSubmitHandler}
                >
                    <h1 className={cx('create-product__container__form__title')}>Create Product</h1>

                    <div className={cx('create-product__container__form__name')}>
                        <SpellcheckIcon />
                        <input
                            type="text"
                            placeholder="Product Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className={cx('create-product__container__form__sku')}>
                        <InventoryIcon />
                        <input
                            type="text"
                            placeholder="SKU"
                            required
                            value={sku}
                            onChange={(e) => setSku(e.target.value)}
                        />
                    </div>
                    <div className={cx('create-product__container__form__price')}>
                        <AttachMoneyIcon />
                        <input type="number" placeholder="Price" required onChange={(e) => setPrice(e.target.value)} />
                    </div>

                    <div className={cx('create-product__container__form__description')}>
                        <DescriptionIcon />

                        <textarea
                            placeholder="Product Description"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            cols="30"
                            rows="1"
                        ></textarea>
                    </div>

                    <div className={cx('create-product__container__form__category')}>
                        <AccountTreeIcon />
                        <select onChange={(e) => setCategory(e.target.value)}>
                            <option value="">Choose Category</option>
                            {categories.map((cate) => (
                                <option key={cate} value={cate}>
                                    {cate}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={cx('create-product__container__form__gender')}>
                        <MaleIcon />
                        <select onChange={(e) => setGender(e.target.value)}>
                            <option value="">Choose Gender</option>
                            {genders.map((gender) => (
                                <option key={gender} value={gender}>
                                    {gender}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('create-product__container__form__name')}>
                        <SpellcheckIcon />
                        <input
                            type="text"
                            placeholder="Product Size"
                            required
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        />
                    </div>
                    <div className={cx('create-product__container__form__name')}>
                        <FormatColorTextIcon />
                        <input
                            type="text"
                            placeholder="Product Color"
                            required
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>

                    <div className={cx('create-product__container__form__stock')}>
                        <StorageIcon />
                        <input type="number" placeholder="Stock" required onChange={(e) => setStock(e.target.value)} />
                    </div>
                    <div className={cx('create-product__container__form__sale')}>
                        <LoyaltyIcon />
                        <input type="text" placeholder="Sale" required onChange={(e) => setSale(e.target.value)} />
                    </div>

                    <div id="createProductFormFile" className={cx('create-product__container__form__img')}>
                        <AttachFileIcon />
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={createProductImagesChange}
                            required
                            multiple
                        />
                    </div>

                    <div id="createProductFormImage" className={cx('create-product__container__form__img-review')}>
                        {imagesPreview.map((image, index) => (
                            <img key={index} src={image} alt="Product Preview" />
                        ))}
                    </div>

                    <Button
                        primary
                        className={cx('create-product__container__form__btn')}
                        //   disabled={loading ? true : false}
                    >
                        Create
                    </Button>
                </form>
            </div>
            <ToastContainer draggable={false} position="top-right" autoClose={3000} />
        </div>
    );
}

export default CreateProduct;
