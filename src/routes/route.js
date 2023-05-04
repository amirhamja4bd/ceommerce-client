import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import '../App.css';
import AdminProfile from '../pages/admin/AdminProfile';
import Brand from '../pages/admin/brand/Brand';
import BrandUpdate from '../pages/admin/brand/BrandUpdate';
import Category from '../pages/admin/category/Category';
import CategoryUpdate from '../pages/admin/category/CategoryUpdate';
import Orders from '../pages/admin/order/Orders';
import Product from '../pages/admin/product/Product';
import Products from '../pages/admin/product/Products';
import ProductUpdate from '../pages/admin/product/ProductUpdate';
import CreatePassword from '../pages/auth/CreatePassword';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import SendOTP from '../pages/auth/SendOTP';
import VerifyOTP from '../pages/auth/VerifyOTP';
import Categories from '../pages/Categories';
import Home from '../pages/Home';
import Profile from '../pages/user/Profile';
import AdminRoute from './AdminRoute';
import UserRoute from './UserRoute';
import ProductView from '../pages/ProductView';
import Cart from '../pages/Cart';
import Shopping from '../pages/Shopping';
import CategoryView from '../pages/CategoryView';
import WishList from '../pages/WishList';
import SearchPage from '../pages/SearchPage';
import Layout from '../layout/Layout';
import AdminLayout from '../layout/AdminLayout';
import NotFound from '../pages/NotFound/NotFound';
import ErrorPage from '../components/errorPage/ErrorPage';
import UserOrders from '../pages/user/Orders';
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserLayout from '../components/nav/UserLayout';
import Address from '../pages/user/Address';
import AddressUpdate from '../pages/user/AddressUpdate';
import Checkout from '../components/card/Checkout';
import UserDashboard from '../pages/admin/UserDashboard';


const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/shopping",
          element: <Shopping />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/category/:slug",
          element: <CategoryView />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/wish",
          element: <WishList />,
        },
        {
          path: "/product/:slug",
          element: <ProductView />,
        },
        {
          path: "/search",
          element: <SearchPage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/send-otp",
          element: <SendOTP/>,
        },
        {
          path: "/verify-otp",
          element: <VerifyOTP/>,
        },
        {
          path: "/create-password",
          element: <CreatePassword/>,
        },
        {
          path: "/*",
          element: <NotFound/>,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <UserLayout>  <UserRoute/> </UserLayout>,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "user",
          element: <UserDashboard/> ,
        },
        {
          path: "user/profile",
          element: <Profile/> ,
        },
        {
          path: "user/address",
          element: <Address/> ,
        },
        {
          path: "user/address/:id",
          element: <AddressUpdate/> ,
        },
        {
          path: "user/orders",
          element: <UserOrders/>,
        },
      ],
    },
    {
      path: "/dashboard",
      element:  <AdminLayout>  <AdminRoute/> </AdminLayout> ,
      errorElement:<ErrorPage/>,
      children: [
        {
          path: "admin",
          element: <AdminDashboard/>,
        },
        {
          path: "admin/dashboard",
          element: <AdminDashboard/>,
        },
        {
          path: "admin/profile",
          element: <AdminProfile/>,
        },
        {
          path: "admin/brand",
          element: <Brand/>,
        },
        {
          path: "admin/brand/update/:slug",
          element: <BrandUpdate/>,
        },
        {
          path: "admin/category",
          element: <Category/>,
        },
        {
          path: "admin/category/update/:slug",
          element: <CategoryUpdate/>,
        },
        {
          path: "admin/product",
          element: <Product/>,
        },
        {
          path: "admin/products",
          element: <Products/>,
        },
        {
          path: "admin/product/update/:slug",
          element: <ProductUpdate/>,
        },
        {
          path: "admin/orders",
          element: <Orders/>,
        },
      ],
    },
  ]);
  
  export default router;
