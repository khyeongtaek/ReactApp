import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/* <React.StrictMode> </React.StrictMode>

  1. <React.StrictMode>는 개발 환경에서만 동작하며, 실제 프로덕션 배포 시에는 자동으로 제거되어 성능에 영향을 주지 않습니다.
  2. 동작 이해
    구분               <StrictMode> 있음                                     <StrictMode> 없음
    렌더링 횟수        개발 중 컴포넌트를 일부러 두 번 렌더링 함             일반적으로 한 번 렌더링 함
    side effect 실행   useEffect 등의 클린업과 재실행이 두 번 일어남         한 번만 실행 함
    버그 발견 지원     안전하지 않은 패턴, deprecated API, 부작용 발견 도움  별도 검사 없음
    성능 영향          개발 환경에서만 작동해 배포 빌드에는 영향 없음        동일                          */