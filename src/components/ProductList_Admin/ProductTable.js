import classNames from 'classnames/bind';
import { useState } from 'react';
import styles from './ProductsList.scss';

import { CardOverflow, Sheet, Stack, Table } from '@mui/joy';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    useReactTable,
} from '@tanstack/react-table';

const cx = classNames.bind(styles);
const columnHelper = createColumnHelper();
const columns = [
    columnHelper.accessor('images', {
        id: 'images',
        header: 'Images',
        cell: ({ row }) => (
            <>
                {row?.original?.images?.length ? (
                    <Stack alignItems={'center'} direction="row" spacing={2}>
                        {
                            <CardOverflow sx={{ width: 70, height: 70 }}>
                                <img src={row?.original?.images[0].url} alt="images" />
                            </CardOverflow>
                        }
                    </Stack>
                ) : null}
            </>
        ),
    }),

    // columnHelper.accessor('_id', {
    //     id: '_id',
    //     header: '_id',
    //     cell: ({ row }) => (
    //         <Stack>
    //             <span>{row.original._id}</span>
    //         </Stack>
    //     ),
    // }),
    columnHelper.accessor('SKU', {
        id: 'SKU',
        header: 'SKU',
    }),
    columnHelper.accessor('variants', {
        id: 'variants',
        header: 'Variants',
        cell: ({ row }) => {
            return (
                <Stack>
                    {row.depth === 0 && row?.originalSubRows?.length ? (
                        row.getCanExpand() ? (
                            <button onClick={() => row.toggleExpanded()}>{row.getIsExpanded() ? 'Ẩn' : 'Hiện'}</button>
                        ) : null
                    ) : row.depth === 0 && !row?.originalSubRows?.length ? (
                        <button>không</button>
                    ) : (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <span>Color: {JSON.stringify(row.original.color.name)}</span>
                            <span>Size: {JSON.stringify(row.original.size.name)}</span>
                        </div>
                    )}
                </Stack>
            );
        },
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
