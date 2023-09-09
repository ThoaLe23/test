import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OderPage from "../pages/OderPage/OderPage";
import ProductDetailsPage from "../pages/ProductDetailsPage/ProductDetailsPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

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
        path: '/products',
        page: ProductsPage,  
        isShowHeader: true,

    },
    {
        path: '/type',
        page: TypeProductPage,  
        isShowHeader: true,

    },
    {
        path: '/sign-in',
        page: SignInPage,  
        isShowHeader: true,

    },
    {
        path: '/sign-up',
        page: SignUpPage,  
        isShowHeader: true,

    },
    {
        path: '/product-details',
        page: ProductDetailsPage,  
        isShowHeader: true,

    },
    {
        path: '*',
        page: NotFoundPage
    }
]