import React, { useState, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductTable.scss';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { CardOverflow, Sheet, Stack, Table, IconButton, Button } from '@mui/joy';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const columnHelper = createColumnHelper();

function ProductsTable({ data }) {
    const columns = useMemo(
        () => [
            columnHelper.accessor('images', {
                id: 'images',
                header: 'Images',
                cell: ({ row }) => (
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
            }),

            columnHelper.accessor('SKU', {
                id: 'SKU',
                header: 'SKU',
            }),
            columnHelper.accessor('variants', {
                id: 'variants',
                header: 'Variants',
                cell: ({ row }) => {
                    return (
                        <Stack className={cx('product-table__table__variants')}>
                            {row.depth === 0 && row?.originalSubRows?.length ? (
                                row.getCanExpand() ? (
                                    <button
                                        className={cx('product-table__table__variants--btn')}
                                        onClick={() => row.toggleExpanded()}
                                    >
                                        {row.getIsExpanded() ? <ExpandMoreIcon /> : <KeyboardArrowRightIcon />}
                                    </button>
                                ) : null
                            ) : null}
                        </Stack>
                    );
                },
            }),

            columnHelper.accessor('name', {
                id: 'name',
                header: 'Name',
            }),

            columnHelper.accessor(
                (row) =>
                    row?.variants?.length
                        ? row?.variants.reduce((t, v) => {
                              return t + v.stock;
                          }, 0)
                        : row.stock,
                {
                    id: 'stock',
                    header: 'Stock',
                },
            ),
            columnHelper.accessor(
                (row) =>
                    row?.variants?.length
                        ? row?.variants.reduce((t, v) => {
                              return [...t, v.size.name].join(', ');
                          }, [])
                        : row?.size?.name,
                {
                    id: 'size',
                    header: 'Size',
                },
            ),
            columnHelper.accessor(
                (row) =>
                    row?.variants?.length
                        ? row?.variants.reduce((t, v) => {
                              return [...t, v.color.name];
                          }, [])
                        : row?.color?.name,
                {
                    id: 'color',
                    header: 'Color',
                },
            ),

            columnHelper.accessor('price', {
                id: 'price',
                header: 'Price',
            }),
            columnHelper.accessor('action', {
                id: 'action',
                header: <p style={{ textAlign: 'center' }}>Actions</p>,
                cell: ({ row }) => (
                    <Stack justifyContent={'center'} direction={'row'} spacing={1}>
                        {row.depth === 0 ? (
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
                        ) : row.depth === 0 && !row?.getParentRow()?.length ? null : (
                            <div>
                                <IconButton
                                    color="success"
                                    // component={Link}
                                    // to={`${row.original._id}/edit`}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    color="danger"

                                    //   component={Link}
                                    // to={`${row.original._id}/delete`}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        )}
                    </Stack>
                ),
            }),
        ],
        [],
    );
    // const [direction, setDirection] = useState(false);
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
    return (
        <>
            {/* <Button sx={{ mb: 2 }}>Create Product</Button> */}
            <Sheet className={cx('product-table')}>
                <Table className={cx('product-table__table')}>
                    <thead className={cx('product-table__table__thead')}>
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
        </>
    );
}

export default ProductsTable;
