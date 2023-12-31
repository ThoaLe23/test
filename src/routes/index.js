import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OderPage from "../pages/OderPage/OderPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import AdminPage from "../pages/AdminPage/AdminPage";
import PaymentPage from "../pages/Payment Page/PaymentPage";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import MyOderPage from "../pages/MyOderPage/MyOderPage";
import DetailsOrderPage from "../pages/DetailsOrderPage/DetailsOrderPage";

export const routes =[
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/oder',
        page: OderPage,
        isShowHeader: true,
    },
    {
        path: '/my-order',
        page: MyOderPage,
        isShowHeader: true,
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowHeader: true,
    },
    {
        path: '/orderSuccess',
        page: OrderSuccess,
        isShowHeader: true,
    },
    {
        path: '/details-order/:id',
        page: DetailsOrderPage,
        isShowHeader: true,
    },
    {
        path: '/products',
        page: ProductsPage,  
        isShowHeader: true,

    },
    {
        path: '/product/:type',
        page: TypeProductPage,  
        isShowHeader: true,

    },
    {
        path: '/sign-in',
        page: SignInPage,  
        isShowHeader: false,

    },
    {
        path: '/sign-up',
        page: SignUpPage,  
        isShowHeader: false,

    },
    {
        path: '/product-details/:id',
        page: ProductDetailsPage,  
        isShowHeader: true,
    },
    {
        path: '/profile-user',
        page: ProfilePage,  
        isShowHeader: true,
    },
    {
        path: '/admin',
        page: AdminPage,  
        isShowHeader: false,
        isPrivate: true,
    },
    {
        path: '*',
        page: NotFoundPage
    }
]