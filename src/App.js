import React from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/Footer';
import MasterLayout from './components/nav/MasterLayout';
import { useAuth } from './context/AuthContext';
import AdminProfile from './pages/admin/AdminProfile';
import Brand from './pages/admin/brand/Brand';
import BrandUpdate from './pages/admin/brand/BrandUpdate';
import Category from './pages/admin/category/Category';
import CategoryUpdate from './pages/admin/category/CategoryUpdate';
import Orders from './pages/admin/order/Orders';
import Product from './pages/admin/product/Product';
import Products from './pages/admin/product/Products';
import ProductUpdate from './pages/admin/product/ProductUpdate';
import CreatePassword from './pages/auth/CreatePassword';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import SendOTP from './pages/auth/SendOTP';
import VerifyOTP from './pages/auth/VerifyOTP';
import Categories from './pages/Categories';
import Home from './pages/Home';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/user/Profile';
import AdminRoute from './routes/AdminRoute';
import UserRoute from './routes/UserRoute';
import { FloatButton } from 'antd';
import ProductView from './pages/ProductView';
import Shop from './pages/Shop';

function App() {
  const [auth , setAuth] = useAuth();


  return (
    <div className="App">
      <BrowserRouter>
        <MasterLayout/>
        <Toaster position='top-right'/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/shop' element={<Shop/>} />
          <Route path='/categories' element={<Categories/>} />
          <Route path='/product/:slug' element={<ProductView/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route exact path="/send-otp" element={<SendOTP/>}/>
          <Route exact path="/verify-otp" element={<VerifyOTP/>}/>
          <Route exact path="/create-password" element={<CreatePassword/>}/>
          <Route path='/*' element={<NotFound/>} />

          {/* Admin Route */}
          <Route path='dashboard' element={<AdminRoute/>}>
            <Route path='admin' element={<Products/>}/>
            <Route path='admin/profile' element={<AdminProfile/>}/>
            <Route path='admin/brand' element={<Brand/>}/>
            <Route path='admin/brand/update/:slug' element={<BrandUpdate/>}/>
            <Route path='admin/category' element={<Category/>}/>
            <Route path='admin/category/update/:slug' element={<CategoryUpdate/>}/>
            <Route path='admin/product' element={<Product/>}/>
            <Route path='admin/products' element={<Products/>}/>
            <Route path='admin/product/update/:slug' element={<ProductUpdate/>}/>
            <Route path='admin/orders' element={<Orders/>}/>

          </Route>

          {/* User Route */}
          <Route path='dashboard' element={<UserRoute/>}>
            <Route path='user' element={<Home/>}/>
            <Route path='user/profile' element={<Profile/>}/>

          </Route>
          
        </Routes>
        <Footer/>
        <FloatButton.BackTop />
      </BrowserRouter>
    </div>
  );
}

export default App;
