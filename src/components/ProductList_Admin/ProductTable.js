import { Fragment, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductTable.scss';
import FilterProduct from './FilterProduct';
import GlobalFilter from '~/components/ProductList_Admin/FilterProduct/GlobalFilter';
import PropTypes from 'prop-types';

import { Sheet, Table, Box } from '@mui/joy';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { useTable, useSortBy, useGlobalFilter, useFilters, useExpanded, usePagination } from 'react-table';

const cx = classNames.bind(styles);

function ProductsTable({
    columns,
    data,
    renderRowSubComponent,
    rowOnClick,
    rowClickHandler,
    isFilter,
    showPagination,
}) {
    const filterTypes = useMemo(
        () => ({
            includes: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase())
                        : true;
                });
            },

            startsWith: (rows, id, filterValue) => {
                return rows.filter((row) => {
                    const rowValue = row.values[id];
                    return rowValue !== undefined
                        ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
                        : true;
                });
            },
        }),
        [],
    );
    const sortTypes = useMemo(
        () => ({
            dateSort: (a, b) => {
                a = new Date(a).getTime();
                b = new Date(b).getTime();
                return b > a ? 1 : -1;
            },
        }),
        [],
    );
    const defaultColumn = useMemo(
        () => ({
            Filter: FilterProduct,
            disableFilters: true,
        }),
        [],
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        setGlobalFilter,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { globalFilter, pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
            filterTypes,
            sortTypes,
            autoResetPage: false,
        },
        useGlobalFilter,
        useFilters,
        useSortBy,
        useExpanded,
        usePagination,
    );

    return (
        <Box>
            {isFilter ? <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> : null}
            <Sheet className={cx('product-table')}>
                <Table className={cx('product-table__table')} {...getTableProps()}>
                    <thead className={cx('product-table__table__thead')}>
                        {headerGroups &&
                            headerGroups.map((headerGroup, i) => (
                                <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                                    {headerGroup.headers.map((column) => (
                                        <th key={column?.id} {...column.getHeaderProps()}>
                                            <span {...column.getSortByToggleProps()}>
                                                {column?.render('Header')}
                                                {column.isSorted ? (
                                                    column.isSortedDesc ? (
                                                        <ArrowDownwardIcon />
                                                    ) : (
                                                        <ArrowUpwardIcon />
                                                    )
                                                ) : (
                                                    ''
                                                )}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <Fragment key={row.id}>
                                    <tr
                                        {...row.getRowProps()}
                                        onClick={rowOnClick ? () => rowClickHandler(row.original) : () => ''}
                                    >
                                        {row.cells.map((cell) => {
                                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                                        })}
                                    </tr>
                                    {row.isExpanded ? (
                                        <tr>
                                            <td>
                                                <span className={cx('product-table__sub-table')}>
                                                    {renderRowSubComponent({ row })}
                                                </span>
                                            </td>
                                        </tr>
                                    ) : null}
                                </Fragment>
                            );
                        })}
                    </tbody>
                </Table>
            </Sheet>
            {showPagination ? (
                <ul className={cx('product-pagination')}>
                    <li>
                        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                            <KeyboardDoubleArrowLeftIcon />
                        </button>
                        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                            <KeyboardArrowLeftIcon />
                        </button>
                    </li>
                    <li>
                        <span>
                            Page{' '}
                            <strong>
                                {pageIndex + 1} of {pageOptions.length}
                            </strong>
                        </span>
                        <span>
                            | Go to page:
                            <span>
                                <input
                                    type="number"
                                    defaultValue={pageIndex + 1}
                                    onChange={(e) => {
                                        const page = e.target.value ? Number(e.target.value) - 1 : 0;
                                        gotoPage(page);
                                    }}
                                />
                            </span>
                        </span>
                        <span>
                            <select
                                value={pageSize}
                                onChange={(e) => {
                                    setPageSize(Number(e.target.value));
                                }}
                            >
                                {[5, 10, 15, 20, 25, 50].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        Show {pageSize}
                                    </option>
                                ))}
                            </select>
                        </span>
                    </li>
                    <li>
                        <button onClick={() => nextPage()} disabled={!canNextPage}>
                            <KeyboardArrowRightIcon />
                        </button>
                        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                            <KeyboardDoubleArrowRightIcon />
                        </button>
                    </li>
                </ul>
            ) : (
                ''
            )}
        </Box>
    );
}

ProductsTable.defaultProps = {
    rowOnClick: false,
    showPagination: false,
    expandRows: false,
    expandedRowObj: {},
};

ProductsTable.propTypes = {
    /** Specified if pagination should show or not */
    showPagination: PropTypes.bool.isRequired,

    /** Specifies if there should be a row onClick action*/
    rowOnClick: PropTypes.bool.isRequired,

    /** OPTIONAL: The onClick Action to be taken */
    rowClickHandler: PropTypes.func,

    /** header color background. There are six possible choices. Refer to ReadMe file for specifics */
    headerColor: PropTypes.string,
};

export default ProductsTable;
