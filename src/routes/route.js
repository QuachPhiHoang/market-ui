import HomePage from '~/pages/Home';
import ContactPage from '~/pages/Contact';
import ProductPage from '~/pages/Shop';
import CategoriesPage from '~/pages/Categories';
import AboutPage from '~/pages/About';
import SingleProductPage from '~/pages/SingleProductPage';
import CartShopping from '~/pages/CartShopping';
import CheckOutPage from '~/pages/CheckOutPage';
import LoginPage from '~/pages/Login';
import RegisterPage from '~/pages/Register';
import AccountPage from '~/pages/Account';
import UpdateProfilePage from '~/pages/UpdateProfile';
import UpdatePassWordPage from '~/pages/UpdatePassWord';
import ForgotPasswordPage from '~/pages/ForgotPassword';
import ResetPasswordPage from '~/pages/ResetPasswordPage';
import ConfirmOrderPage from '~/pages/ConfirmOrderPage';
import PaymentPage from '~/pages/Payment';
import SuccessPage from '~/pages/Success';
import OrdersPage from '~/pages/OrdersPage';
import OrderDetailsPage from '~/pages/OrderDetails';
import AdminPage from '~/pages/Admin';
import AdminProductsPage from '~/pages/Admin/AdminProductsPage';
import AdminNewProductPage from '~/pages/Admin/AdminProductsPage/AdminNewProductPage';
import AdminProductPageDetails from '~/pages/Admin/AdminProductsPage/AdminProductPageDetails';
import AdminColorsPage from '~/pages/Admin/AdminColor';
import AdminCreateColorPage from '~/pages/Admin/AdminColor/AdminNewColorPage';
import AdminNewSizePage from '~/pages/Admin/AdminSize/AdminNewSizePage';
import AdminSizesPage from '~/pages/Admin/AdminSize/AdminSize';
import AdminNewProductVariants from '~/pages/Admin/AdminProductsPage/AdminNewProductVariants';
const publicRoute = [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/categories/:id', component: SingleProductPage },
    { path: '/category', component: CategoriesPage },
    { path: '/product', component: ProductPage },
    { path: '/contact', component: ContactPage },
    { path: '/cart', component: CartShopping, isAuthenticated: true },
    { path: '/shipping', component: CheckOutPage, isAuthenticated: true },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/account', component: AccountPage, isAuthenticated: true },
    { path: '/update/profile', component: UpdateProfilePage, isAuthenticated: true },
    { path: '/update/password', component: UpdatePassWordPage, isAuthenticated: true },
    { path: '/confirm-order', component: ConfirmOrderPage, isAuthenticated: true },
    { path: '/forgot-password', component: ForgotPasswordPage },
    { path: '/password/reset/:token', component: ResetPasswordPage },
    { path: '/payment', component: PaymentPage, isAuthenticated: true, isStripe: true },
    { path: '/success', component: SuccessPage, isAuthenticated: true },
    { path: '/orders', component: OrdersPage, isAuthenticated: true },
    { path: '/order/:id', component: OrderDetailsPage, isAuthenticated: true },
    { path: '/admin/dashboard', component: AdminPage, isAuthenticated: true, isAdmin: true },
    { path: '/admin/products', component: AdminProductsPage, isAuthenticated: true, isAdmin: true },
    { path: '/admin/create-product', component: AdminNewProductPage, isAuthenticated: true, isAdmin: true },
    { path: '/admin/products/:id/edit', component: AdminProductPageDetails, isAuthenticated: true, isAdmin: true },
    { path: '/admin/products/:id/delete', component: AdminProductPageDetails, isAuthenticated: true, isAdmin: true },
    {
        path: '/admin/products/:id/create-variant',
        component: AdminNewProductVariants,
        isAuthenticated: true,
        isAdmin: true,
    },

    { path: '/admin/colors', component: AdminColorsPage, isAuthenticated: true, isAdmin: true },
    { path: '/admin/create-color', component: AdminCreateColorPage, isAuthenticated: true, isAdmin: true },
    { path: '/admin/sizes', component: AdminSizesPage, isAuthenticated: true, isAdmin: true },
    { path: '/admin/create-size', component: AdminNewSizePage, isAuthenticated: true, isAdmin: true },
];

export { publicRoute };
