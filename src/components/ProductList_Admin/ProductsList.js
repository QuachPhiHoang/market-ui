import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './ProductsList.scss';
import Sidebar from '../SideBar/Sidebar';
import { getAdminProducts, deleteProducts, reset } from '~/redux/product-modal/productsSlice';
import { ToastContainer, toast } from 'react-toastify';
import ProductsTable from './ProductTable';

const cx = classNames.bind(styles);

function ProductsList() {
    const { products, isDeleted } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAdminProducts());
    }, [dispatch]);

    return (
        <div className={cx('products-list')}>
            <Sidebar />
            <ProductsTable data={products?.length ? products : []} />
            <ToastContainer draggable={false} position="top-right" autoClose={3000} />
        </div>
    );
}

export default ProductsList;
