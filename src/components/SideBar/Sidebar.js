import { Link } from 'react-router-dom';
import { TreeView, TreeItem } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import HeightIcon from '@mui/icons-material/Height';
import classNames from 'classnames/bind';
import styles from './Sidebar.scss';
import icons from '~/assets/icons';

const cx = classNames.bind(styles);
function Sidebar() {
    return (
        <div className={cx('sidebar')}>
            <Link className={cx('sidebar__dashboard')} to={'/admin/dashboard'}>
                <img src={icons.dashboard} alt="dashboard" />
                <p className={cx('sidebar__dashboard__title')}>Dashboard</p>
            </Link>
            <div className={cx('sidebar__dashboard__products')}>
                <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ImportExportIcon />}>
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                        </Link>

                        <Link to="/admin/create-product">
                            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </div>
            <div className={cx('sidebar__dashboard__color')}>
                <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ColorLensIcon />}>
                    <TreeItem nodeId="1" label="Colors">
                        <Link to="/admin/colors">
                            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                        </Link>

                        <Link to="/admin/create-color">
                            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </div>
            <div className={cx('sidebar__dashboard__size')}>
                <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<HeightIcon />}>
                    <TreeItem nodeId="1" label="Sizes">
                        <Link to="/admin/sizes">
                            <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
                        </Link>

                        <Link to="/admin/create-size">
                            <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
                        </Link>
                    </TreeItem>
                </TreeView>
            </div>

            <Link to="/admin/orders" className={cx('sidebar__dashboard__orders')}>
                <p>
                    <ListAltIcon />
                    Orders
                </p>
            </Link>
            <Link to="/admin/users" className={cx('sidebar__dashboard__user')}>
                <p>
                    <PeopleIcon /> Users
                </p>
            </Link>
            <Link to="/admin/reviews" className={cx('sidebar__dashboard__reviews')}>
                <p>
                    <RateReviewIcon />
                    Reviews
                </p>
            </Link>
        </div>
    );
}

export default Sidebar;
