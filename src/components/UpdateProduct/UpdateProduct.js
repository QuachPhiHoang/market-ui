import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import Sidebar from './Sidebar';
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
import Button from '~/components/Button';
import { getProductDetail } from '~/redux/product-modal/productDetailSlice';
import { updateProduct } from '~/redux/product-modal/productsSlice';
import { reset } from '~/redux/product-modal/productsSlice';

const cx = classNames.bind(styles);

function UpdateProduct() {
    const { id } = useParams();
    const { product } = useSelector((state) => state.productDetailSlice);
    const { isUpdated } = useSelector((state) => state.products);

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
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const categories = ['Áo Thun', 'Áo Sơ Mi', 'Áo Polo', 'Áo Hoodie', 'Áo Khoác', 'Quần Jean'];
    const genders = ['Female', 'Male'];
    // const [newPrice, setNewPrice] = useState(0);
    const navigate = useNavigate();

    const pushToArray = (items) => {
        const item = [];
        const data = items.split(',');
        item.push(data);
        return item;
    };

    useEffect(() => {
        if (product && product?.product?._id !== id) {
            dispatch(getProductDetail(id));
            // console.log(product.product.price);
        } else {
            setName(product?.product.name);
            setDesc(product?.product.desc);
            setPrice(product?.product.price);
            setCategory(product?.product.category);
            setStock(product?.product.stock);
            setOldImages(product?.product.images);
            setGender(product?.product.gender);
            setSize(product?.product.size);
            setColor(product?.product.colors);
        }

        if (isUpdated) {
            alert('Product Created Successfully');
            navigate('/admin/products');
            dispatch(reset());
        }
    }, [dispatch, isUpdated, id, product, navigate]);

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

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

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
        <div className={cx('update-product')}>
            <div className={cx('update-product__container')}>
                <form
                    className={cx('update-product__container__form')}
                    encType="multipart/form-data"
                    onSubmit={updateProductSubmitHandler}
                >
                    <h1 className={cx('update-product__container__form__title')}>Update Product</h1>

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
                        <input
                            type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={updateProductImagesChange}
                            required
                            multiple
                        />
                    </div>
                    <div id="createProductFormImage" className={cx('update-product__container__form__img-review')}>
                        {oldImages &&
                            oldImages.map((image, index) => <img key={index} src={image.url} alt="Product Preview" />)}
                    </div>

                    <div id="createProductFormImage" className={cx('update-product__container__form__img-review')}>
                        {imagesPreview.map((image, index) => (
                            <img key={index} src={image} alt="Product Preview" />
                        ))}
                    </div>

                    <Button
                        primary
                        className={cx('update-product__container__form__btn')}
                        //   disabled={loading ? true : false}
                    >
                        Update
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProduct;
