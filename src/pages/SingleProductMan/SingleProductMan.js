import Footer from '~/components/Footer';
import Header from '~/components/Header';
import ProductDetails from '~/components/ProductDetails';
import images from '~/assets/images';

function SingleProductWoman() {
    return (
        <div>
            <Header />
            <ProductDetails image={images.img_productDetailsMan} title={'Plain T Shirt'} gender={'Man'} />
            <Footer />
        </div>
    );
}

export default SingleProductWoman;
