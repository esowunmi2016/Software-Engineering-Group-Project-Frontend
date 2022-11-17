import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// import { store } from './app/store';
import store from './redux/store';
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import './index.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import App from './App';
import Signin from './pages/auth/signin';
import Dashboard3 from './pages/employee/dashboard';
import Dashboard1 from './pages/hr/dashboard';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter basename={process.env.PUBLIC_URL}>
        <Routes >
          <Route path='/' element={<Signin />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard3' element={<Dashboard3 />} />
          <Route path='/dashboard1' element={<Dashboard1 />} />
        </Routes>
      </HashRouter>

      {/* <App /> */}
    </Provider>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
