import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ToastContainer, toast } from 'react-toastify';

import classNames from 'classnames/bind';
import styles from './SizeList.scss';
import Sidebar from '~/components/SideBar/Sidebar';
import Button from '~/components/Button';
import CustomModal from './ModalEditSize';
import { getAllSize, deleteSize, reset } from '~/redux/size/sizeSlice';

const cx = classNames.bind(styles);

function SizeList() {
    const dispatch = useDispatch();
    const { sizes, isDeleted } = useSelector((state) => state.sizes);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [id, setId] = useState('');

    const deleteSizeHandler = (id) => {
        dispatch(deleteSize(id));
    };
    const openModal = (id) => {
        setIsModalOpen(true);
        setId(id);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setId('');
        dispatch(getAllSize());
    };
    const handleSuccess = () => {
        // Your success logic here
        console.log('Modal closed on success!');
        closeModal();
    };

    useEffect(() => {
        if (isDeleted) {
            toast.success('Color Deleted Successfully', { draggable: true, position: toast.POSITION.BOTTOM_CENTER });
            dispatch(reset());
            dispatch(getAllSize());
        } else {
            dispatch(getAllSize());
        }
        dispatch(getAllSize());
    }, [dispatch, isDeleted]);

    const rows = [];
    sizes &&
        sizes.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name,
            });
        });
    const columns = [
        { field: 'id', headerName: 'Size ID', minWidth: 260, flex: 1 },

        {
            field: 'name',
            headerName: 'Size',
            minWidth: 280,
            flex: 0.6,
        },
        {
            field: 'actions',
            flex: 0.3,
            headerName: 'Actions',
            minWidth: 150,
            type: 'number',
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Button
                            small
                            outline
                            primary
                            onClick={() => openModal(params.id)}
                            className={cx('size-list__btn-edit')}
                        >
                            <EditIcon />
                        </Button>

                        <Button
                            small
                            primary
                            onClick={() => deleteSizeHandler(params.id)}
                            className={cx('size-list__btn-delete')}
                        >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];
    return (
        <div className={cx('size-list')}>
            <Sidebar />
            <div className={cx('size-list__container')}>
                <DataGrid columns={columns} rows={rows} pageSizeOptions={[10, 20, 50]} />
            </div>
            <ToastContainer draggable={false} position="top-right" autoClose={3000} />
            <CustomModal isOpen={isModalOpen} closeModal={closeModal} onSuccess={handleSuccess} itemId={id} />
        </div>
    );
}

export default SizeList;
