import Benefit from '~/components/Benefit';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import Hero from '~/components/Hero';
import NewProduct from '~/components/Products';
import ProductViewModal from '~/components/ProductDetails/ProductViewModal';
import Promo from '~/components/Promo';
import Sell from '~/components/Sell';

function Home() {
    return (
        <div>
            <Header />
            <Hero />
            <NewProduct label="Discover NEW Arrivals" description="Recently added shirts!" />
            <Benefit />
            <Promo />
            <Sell label="Top Sellers" description="Browse our top-selling products" />
            <Footer />
            <ProductViewModal />
        </div>
    );
}

export default Home;
