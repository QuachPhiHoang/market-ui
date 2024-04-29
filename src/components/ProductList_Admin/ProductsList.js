import { useEffect, useMemo, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames/bind';
import styles from './ProductsList.scss';
import Sidebar from '../SideBar/Sidebar';
import { getAdminProducts } from '~/redux/product-modal/productsSlice';
import { ToastContainer } from 'react-toastify';
import ProductsTable from './ProductTable';
import { CardOverflow, Stack, IconButton } from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const cx = classNames.bind(styles);

function ProductsList() {
    const { products } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const expandedRows = { 0: false, 1: false, 2: true, 3: true };

    useEffect(() => {
        dispatch(getAdminProducts());
    }, [dispatch]);
    const columns = useMemo(
        () => [
            {
                Header: () => null,
                id: 'expander',
                Cell: ({ row }) => (
                    <Stack {...row.getToggleRowExpandedProps()}>
                        {row.isExpanded ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
                    </Stack>
                ),
            },
            {
                Header: 'Images',
                id: 'images',
                Cell: ({ row }) => (
                    <>
                        {row?.original?.images?.length ? (
                            <Stack className={cx('product-table__table__image')}>
                                {
                                    <CardOverflow>
                                        <img src={row?.original?.images[0].url} alt="images" />
                                    </CardOverflow>
                                }
                            </Stack>
                        ) : null}
                    </>
                ),
            },
            {
                Header: 'SKU',
                id: 'SKU',
                accessor: 'SKU',
            },

            {
                Header: 'Name',
                accessor: 'name',
                id: 'name',
            },

            {
                Header: 'Stock',
                id: 'stock',
                accessor: (row) =>
                    row?.variants?.length
                        ? row?.variants.reduce((t, v) => {
                              return t + v.stock;
                          }, 0)
                        : row.stock,
            },
            {
                id: 'size',
                Header: 'Size',
                accessor: (row) =>
                    row?.variants?.length
                        ? row?.variants.reduce((t, v) => {
                              return [...t, v.size.name].join(' ');
                          }, [])
                        : row?.size?.name,
            },
            {
                id: 'color',
                Header: 'Color',
                accessor: (row) =>
                    row?.variants?.length
                        ? row?.variants.reduce((t, v) => {
                              return [...t, v.color.name];
                          }, [])
                        : row?.color?.name,
            },

            {
                Header: 'Price',
                accessor: 'price',
                id: 'price',
            },
            {
                id: 'action',
                Header: <p style={{ textAlign: 'center' }}>Actions</p>,
                Cell: ({ row }) => (
                    <Stack justifyContent={'center'} direction={'row'} spacing={1}>
                        <div>
                            <IconButton component={Link} to={`${row.original._id}/create-variant`}>
                                <AddIcon />
                            </IconButton>
                            <IconButton color="success" component={Link} to={`${row.original._id}/edit`}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="danger" component={Link} to={`${row.original._id}/delete`}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </Stack>
                ),
            },
        ],
        [],
    );
    const details = useMemo(
        () => [
            {
                Header: 'Size',
                accessor: (d) => {
                    return d.size.name;
                },
            },
            {
                Header: 'Color',
                accessor: (d) => {
                    return d.color.name;
                },
            },
            {
                Header: 'Stock',
                accessor: (d) => {
                    return d.stock;
                },
            },
            {
                id: 'action',
                Header: 'Action',
                Cell: ({ row }) => (
                    <Stack>
                        <div>
                            <IconButton color="success" component={Link} to={`${row.original._id}/edit-variant`}>
                                <EditIcon />
                            </IconButton>
                            <IconButton color="danger" component={Link} to={`${row.original._id}/delete-variant`}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </Stack>
                ),
            },
        ],
        [],
    );

    const subTable = useCallback(
        ({ row }) =>
            row?.original?.variants?.length > 0 ? (
                <ProductsTable
                    isFilter={false}
                    showPagination={false}
                    columns={details}
                    data={row?.original?.variants}
                />
            ) : (
                'No Data'
            ),
        [details],
    );

    return (
        <div className={cx('products-list')}>
            <Sidebar />
            {products.length > 0 ? (
                <ProductsTable
                    isFilter={true}
                    data={products}
                    columns={columns}
                    expandRows={true}
                    expandedRowObj={expandedRows}
                    renderRowSubComponent={subTable}
                    showPagination={true}
                />
            ) : (
                'No Data'
            )}
            <ToastContainer draggable={false} position="top-right" autoClose={3000} />
        </div>
    );
}

export default ProductsList;
