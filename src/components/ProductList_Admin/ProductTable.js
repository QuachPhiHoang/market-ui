import classNames from 'classnames/bind';
import styles from './ProductsList.scss';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Button from '~/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getAdminProducts, deleteProducts, reset } from '~/redux/product-modal/productsSlice';
import { ToastContainer, toast } from 'react-toastify';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getExpandedRowModel,
} from '@tanstack/react-table';
import { Sheet, Table, CardOverflow, Stack } from '@mui/joy';

const cx = classNames.bind(styles);
const columnHelper = createColumnHelper();
const columns = [
    columnHelper.accessor('images', {
        id: 'images',
        header: 'Images',
        cell: ({ row }) => (
            <Stack alignItems={'center'} direction="row" spacing={2}>
                {
                    <CardOverflow sx={{ width: 70, height: 70 }}>
                        <img src={row?.original?.images[0].url} alt="images" />
                    </CardOverflow>
                }
            </Stack>
        ),
    }),

    columnHelper.accessor('_id', {
        id: '_id',
        header: '_id',
        cell: ({ row }) => (
            <Stack>
                {row.getCanExpand() ? (
                    <button onClick={row.getToggleExpandedHandler()}>co</button>
                ) : (
                    <button>khong</button>
                )}
                <span>{row.original._id}</span>
            </Stack>
        ),
    }),
    columnHelper.accessor('SKU', {
        id: 'SKU',
        header: 'SKU',
    }),
    // columnHelper.accessor('variants', {
    //     id: 'variants',
    //     header: 'Variants',
    //     // cell: ({ row }) => (
    //     //     <Stack>
    //     //         {row?.originalSubRows &&
    //     //             row?.originalSubRows.map((subRow) => (
    //     //                 <div key={subRow._id}>
    //     //                     {/* <span>{JSON.stringify(subRow)}</span> */}
    //     //                     <span>{JSON.stringify(subRow.size.name)}</span>
    //     //                     <span>{JSON.stringify(subRow.color.name)}</span>
    //     //                 </div>
    //     //             ))}
    //     //     </Stack>
    //     // ),
    // }),

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

function ProductsTable({ data }) {
    const [direction, setDirection] = useState(false);
    const [expanded, setExpanded] = useState({});
    const table = useReactTable({
        data,
        columns,
        state: {
            expanded,
        },
        getSubRows: (row) => row.variants,
        onExpandedChange: setExpanded,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    });
    // console.log(data);

    // const deleteProductHandler = (id) => {
    //     dispatch(deleteProducts(id));
    // };
    return (
        <div>
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
        </div>
    );
}

export default ProductsTable;
