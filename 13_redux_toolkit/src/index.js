/*
  3. Provider
    1) 리액트 앱에서 Redux Store를 제공하는 컴포넌트입니다.
    2) react-redux에서 지원하는 컴포넌트입니다.
    3) Provider의 하위 컴포넌트들은 Provider가 제공한 스토어에 접근할 수 있습니다.
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);