import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Dashboard.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { getAdminProducts } from '~/redux/product-modal/productsSlice';
import { getAdminOrders } from '~/redux/order/orderSlice';
import { getAdminUsers } from '~/redux/user/userSlice';

import Sidebar from '../SideBar/Sidebar';

const cx = classNames.bind(styles);

function Dashboard() {
    Chart.register(...registerables);

    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    const { orders } = useSelector((state) => state.order.allOrders);

    const users = useSelector((state) => state.user);

    let outOfStock = 0;

    products &&
        products.forEach((item) => {
            if (item.Stock === 0) {
                outOfStock += 1;
            }
        });

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAdminOrders());
        dispatch(getAdminUsers());
    }, [dispatch]);

    let totalAmount = 0;
    orders &&
        orders.forEach((item) => {
            totalAmount += item.totalPrice;
        });

    const lineState = {
        labels: ['Initial Amount', 'Amount Earned'],
        datasets: [
            {
                label: 'TOTAL AMOUNT',
                backgroundColor: ['tomato'],
                hoverBackgroundColor: ['rgb(197, 72, 49)'],
                data: [0, totalAmount],
            },
        ],
    };

    const doughnutState = {
        labels: ['Out of Stock', 'InStock'],
        datasets: [
            {
                backgroundColor: ['#00A6B4', '#6800B4'],
                hoverBackgroundColor: ['#4B5000', '#35014F'],
                data: [outOfStock, products.length - outOfStock],
            },
        ],
    };
    return (
        <div className={cx('dashboard')}>
            <Sidebar />
            <div className={cx('dashboard__container')}>
                <div className={cx('dashboard__container__title')}>Dashboard</div>
                <div className={cx('dashboard__container__summary')}>
                    <div>
                        <p>
                            Total Amount <br /> {totalAmount}
                        </p>
                    </div>
                    <div className={cx('dashboard__container__summary__box')}>
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users.allUsers && users.allUsers.length}</p>
                        </Link>
                    </div>
                </div>

                <div className="line-chart">
                    <Line data={lineState} />
                </div>

                <div className="doughnut-chart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
