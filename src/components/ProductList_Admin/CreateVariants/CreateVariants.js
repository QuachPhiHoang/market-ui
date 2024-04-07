import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import Sidebar from './Sidebar';
import { Modal, ModalDialog, ModalClose, Typography, Box } from '@mui/joy';
import classNames from 'classnames/bind';
// import styles from './UpdateProduct.scss';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MaleIcon from '@mui/icons-material/Male';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import { Button } from '@mui/joy';

import { ToastContainer, toast } from 'react-toastify';

// const cx = classNames.bind(styles);

function CreateVariant() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const handleClose = () => {
        navigate(-1);
    };

    return (
        <Modal onClose={handleClose} open>
            <ModalDialog sx={{ maxHeight: '100vh' }}>
                <ModalClose />
                <Typography
                    level="h1"
                    sx={{ textTransform: 'capitalize', textAlign: 'center', fontSize: 32, fontWeight: 600 }}
                >
                    {location.pathname.split('/').reverse()[0]}
                </Typography>
            </ModalDialog>
            {/* <ToastContainer draggable={false} position="top-right" autoClose={3000} /> */}
        </Modal>
    );
}

export default CreateVariant;
