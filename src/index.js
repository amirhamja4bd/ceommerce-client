import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './assets/css/style.css';
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import { AuthProvider } from './context/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>
  </React.StrictMode>
);

