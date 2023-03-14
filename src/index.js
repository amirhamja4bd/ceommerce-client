import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './assets/css/style.css';
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import { AuthProvider } from './context/AuthContext';
import { WishListProvider } from './context/WishListContext';
import { CartProvider } from './context/CartContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      {/* <WishListProvider> */}
        {/* <CartProvider> */}
          <App />
        {/* </CartProvider> */}
      {/* </WishListProvider> */}
    </AuthProvider>
  </React.StrictMode>
);

