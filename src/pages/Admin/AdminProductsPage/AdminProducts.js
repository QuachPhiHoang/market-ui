import { Fragment } from 'react';
import Header from '~/components/Header';
import ProductsList from '~/components/ProductList_Admin/ProductsList';

function AdminProducts() {
    return (
        <Fragment>
            <Header />
            <ProductsList />
        </Fragment>
    );
}

export default AdminProducts;
