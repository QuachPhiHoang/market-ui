import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import classNames from 'classnames/bind';
import styles from './OrdersPage.scss';

import Header from '~/components/Header';
import Footer from '~/components/Footer';
import { myOrder } from '~/redux/order/orderSlice';
import { Link } from 'react-router-dom';
import icons from '~/assets/icons';

const cx = classNames.bind(styles);
function Orders() {
    const dispatch = useDispatch();
    const { myOrders } = useSelector((state) => state.order);
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(myOrder());
    }, [dispatch]);
    const rows = [];
    myOrders &&
        myOrders.forEach((item, index) =>
            rows.push({
                itemsQty: item.orderItem.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            }),
        );
    const columns = [
        {
            field: 'id',
            headerName: 'Order ID',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 0.5,
            minWidth: 150,
            cellClassName: (params) => {
                return params.formattedValue === 'Delivered' ? 'greenColor' : 'redColor';
            },
        },
        {
            field: 'itemsQty',
            headerName: 'Item Quantity',
            type: 'number',
            flex: 0.3,
            minWidth: 150,
        },
        {
            field: 'amount',
            headerName: 'Amount Item',
            flex: 0.5,
            type: 'number',
            minWidth: 270,
        },
        {
            field: 'action',
            flex: 0.3,
            headerName: 'Get Info Order',
            type: 'number',
            minWidth: 150,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.id}`}>
                        <img src={icons.arrowRight} alt="detail order" />
                    </Link>
                );
            },
        },
    ];
    return (
        <div>
            <Header />
            <div className={cx('orders')}>
                <div className={cx('orders__page')}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        className={cx('orders__page__table')}
                        autoHeight
                        disableRowSelectionOnClick
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 10, page: 1 },
                            },
                        }}
                    />
                    <Typography className={cx('orders__page__heading')}>{user?.user?.username}</Typography>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Orders;
