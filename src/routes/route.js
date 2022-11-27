import HomePage from '~/pages/Home';
import ContactPage from '~/pages/Contact';
import ProductPage from '~/pages/Shop';
import CategoriesPage from '~/pages/Categories';
import AboutPage from '~/pages/About';
import SingleProductWoman from '~/pages/SingleProductWoman';
import SingleProductMan from '~/pages/SingleProductMan';
import CartShopping from '~/pages/CartShopping/CartShopping';
import CheckOutPage from '~/pages/CheckOutPage';

const publicRoute = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/categories', component: CategoriesPage },
    { path: '/product', component: ProductPage },
    { path: '/contact', component: ContactPage },
    { path: 'categories/:id', component: SingleProductWoman },
    { path: '/single-product-man', component: SingleProductMan },
    { path: '/cart', component: CartShopping },
    { path: '/checkout', component: CheckOutPage },
];

export { publicRoute };
