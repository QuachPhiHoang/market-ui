import HomePage from '~/pages/Home';
import ContactPage from '~/pages/Contact';
import ProductPage from '~/pages/Shop';
import CategoriesPage from '~/pages/Categories';
import AboutPage from '~/pages/About';
import SingleProductPage from '~/pages/SingleProductPage';
import CartShopping from '~/pages/CartShopping';
import CheckOutPage from '~/pages/CheckOutPage';
import LoginPage from '~/pages/Login';

const publicRoute = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/categories/:id', component: SingleProductPage },
    { path: '/category', component: CategoriesPage },
    { path: '/product', component: ProductPage },
    { path: '/contact', component: ContactPage },
    { path: '/cart', component: CartShopping },
    { path: '/checkout', component: CheckOutPage },
    { path: '/login', component: LoginPage },
];

export { publicRoute };
