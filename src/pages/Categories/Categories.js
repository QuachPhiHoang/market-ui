import Catalog from '~/components/Catalog';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import ProductViewModal from '~/components/ProductDetails/ProductViewModal';

function Categories() {
    return (
        <div>
            <Header />
            <Catalog />
            <ProductViewModal />
            <Footer />
        </div>
    );
}

export default Categories;
