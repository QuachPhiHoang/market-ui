import classNames from 'classnames/bind';
import styles from './ProductsList.scss';
import Sidebar from '../SideBar/Sidebar';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '~/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, deleteProducts, reset } from '~/redux/product-modal/productsSlice';
import { ToastContainer, toast } from 'react-toastify';

import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Sheet, Table, Avatar } from '@mui/joy';

const cx = classNames.bind(styles);
const columnHelper = createColumnHelper();
const columns = [
    columnHelper.accessor('images', {
        id: 'images',
        header: 'Images',
        cell: (info) => <Avatar src={`${info.getValue()}`} />,
    }),
    columnHelper.accessor('id', {
        id: 'id',
        header: 'id',
    }),
    columnHelper.accessor('SKU', {
        id: 'SKU',
        header: 'SKU',
    }),
    columnHelper.accessor('name', {
        id: 'name',
        header: 'Name',
    }),
    columnHelper.accessor('stock', {
        id: 'stock',
        header: 'Stock',
    }),
    columnHelper.accessor('price', {
        id: 'price',
        header: 'Price',
    }),
];

function ProductsList() {
    const [direction, setDirection] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { products, isDeleted } = useSelector((state) => state.products);
    console.log(products);

    useEffect(() => {
        if (isDeleted) {
            toast.success('Product Deleted Successfully', { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
            // navigate('/admin/dashboard');
            dispatch(reset());
            dispatch(getAdminProducts());
        } else {
            dispatch(getAdminProducts());
        }
    }, [dispatch, isDeleted, navigate]);

    const data = [];
    products &&
        products.forEach((item) => {
            data.push({
                id: item._id,
                images: item.images[0],
                SKU: item.SKU,
                stock: item.stock,
                price: item.price,
                name: item.name,
                variants: item.variants,
            });
        });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const deleteProductHandler = (id) => {
        dispatch(deleteProducts(id));
    };

    // const columns = [
    //     { field: 'SKU', headerName: 'SKU', minWidth: 260, flex: 1 },

    //     {
    //         field: 'name',
    //         headerName: 'Name',
    //         minWidth: 200,
    //         flex: 0.3,
    //     },
    //     {
    //         field: 'stock',
    //         headerName: 'Stock',
    //         type: 'number',
    //         minWidth: 100,
    //         flex: 0.3,
    //     },

    //     {
    //         field: 'price',
    //         headerName: 'Price',
    //         type: 'number',
    //         minWidth: 200,
    //         flex: 0.2,
    //     },
    //     {
    //         field: 'actions',
    //         flex: 0.6,
    //         headerName: 'Actions',
    //         minWidth: 350,
    //         type: 'number',
    //         sortable: false,
    //         renderCell: (params) => {
    //             return (
    //                 <Fragment>
    //                     <Button
    //                         small
    //                         outline
    //                         to={`/admin/product/${params.id}`}
    //                         className={cx('products-list__btn-edit')}
    //                     >
    //                         <EditIcon />
    //                     </Button>

    //                     <Button
    //                         small
    //                         primary
    //                         onClick={() => deleteProductHandler(params.id)}
    //                         className={cx('products-list__btn-delete')}
    //                     >
    //                         <DeleteIcon />
    //                     </Button>
    //                     <Button
    //                         small
    //                         primary
    //                         // onClick={() => deleteProductHandler(params.id)}
    //                         className={cx('products-list__btn-expand')}
    //                     >
    //                         <MoreHorizIcon />
    //                     </Button>
    //                 </Fragment>
    //             );
    //         },
    //     },
    // ];
    return (
        <div className={cx('products-list')}>
            <Sidebar />
            <Sheet sx={{ borderRadius: 10, border: '1px solid #ccc' }}>
                <Table aria-label="basic table" sx={{ fontSize: 16 }}>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <th key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</th>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Sheet>

            <ToastContainer draggable={false} position="top-right" autoClose={3000} />
        </div>
    );
}

export default ProductsList;
