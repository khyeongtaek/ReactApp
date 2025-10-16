import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';

/*
  <BrowserRouter>
  1. 리액트 앱 전체의 라우팅 컨텍스트를 관리하는 최상위 컴포넌트입니다.
  2. 일반적으로 src/index.js와 같은 앱 진입점의 가장 상위에 한 번만 두고 사용합니다.
  3. <App/> 컴포넌트를 감싸는 형태로 작성하면 <App/>과 그 하위 컴포넌트들이 모두 <BrowserRouter>의 라우팅 컨텍스트로 관리됩니다.
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
