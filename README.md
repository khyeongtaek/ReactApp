# 🔧 React 개발환경 세팅 가이드

## 📌 1. VSCode Extension

**React 개발을 위해 권장되는 VSCode 확장 프로그램:**

1. **Material Icon Theme** - 파일/폴더 아이콘 테마
2. **Live Server** - 로컬 개발 서버
3. **Prettier** - 코드 포맷터
4. **ES7+ React/Redux/React-Native snippets** - React 코드 스니펫 (rfce : 함수선언식 자동완성)
5. **Reactjs code snippets** - React 코드 스니펫 (rsc : 함수표현식 자동완성)

---

## 🚀 2. Node.js

### 2.1 Node.js란?

Node.js는 Chrome의 V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임(Runtime) 환경입니다.

### 2.2 주요 특징

1. 자바스크립트를 웹 브라우저 밖에서(서버 등 다양한 환경) 실행할 수 있게 해주는 플랫폼
2. 프론트엔드-백엔드 통합 개발이 가능하여 개발 생산성 향상
3. Express.js 같은 프레임워크와 함께 사용하여 구조화된 서버 개발 가능
4. 전 세계에서 가장 큰 오픈소스 패키지 저장소인 **npm**을 통해 수많은 모듈을 쉽게 설치하고 관리 가능

### 2.3 설치

- 다운로드 링크: [https://nodejs.org/ko/download](https://nodejs.org/ko/download)

---

## 📦 3. npm vs npx

### 3.1 npm (Node Package Manager)

패키지 관리자 역할을 하는 도구입니다.

**주요 기능:**

1. Node.js의 기본 패키지 관리자
2. 패키지 설치, 버전 관리, 업데이트 담당
3. 로컬 또는 글로벌 패키지 설치
4. `package.json`의 스크립트 실행

**사용 예시:**
```bash
npm install create-react-app
create-react-app my-app
npm run <script>
```

### 3.2 npx (Node Package eXecute)

npm 5.2.0 이상부터 기본 포함된 패키지 실행 도구입니다.

**주요 기능:**

1. 패키지를 설치하지 않고도 바로 실행 가능
2. 로컬/글로벌에 설치되어 있으면 해당 패키지 실행
3. 없으면 npm 레지스트리에서 최신 버전을 임시로 다운로드하여 실행 후 자동 삭제
4. 일회성 실행(temporary execution)에 유용
5. 전역 설치 없이 최신 버전 실행 가능

**사용 예시:**
```bash
npx create-react-app my-app
```

### 3.3 요약

> **npm**은 패키지를 설치하고 관리하는 도구이고, **npx**는 설치 없이 패키지를 실행할 때 사용하는 도구입니다.

---

## 📄 4. package.json vs package-lock.json

### 4.1 package.json

프로젝트의 메타데이터를 담은 파일입니다.

**주요 특징:**

1. 프로젝트 이름, 버전, 작성자, 스크립트 명령어 등 프로젝트 정보 포함
2. 필요한 패키지와 그 버전 범위를 명시 (예: `^1.0.0` 또는 `~2.3.4`)
3. **개발자가 직접 수정하고 관리**하는 파일
4. 버전 범위 지정으로 인해 `npm install` 시 최신 범위 내 버전이 설치될 수 있음
5. 협업 시 프로젝트가 필요한 기본 의존성 목록을 공유하는 역할

**예시:**
```json
{
  "name": "my-react-app",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

### 4.2 package-lock.json

npm이 자동으로 생성하고 관리하는 파일입니다.

**주요 특징:**

1. **npm이 자동으로 생성하고 관리**하는 파일
2. 현재 프로젝트에 설치되어 있는 각 패키지의 **정확한 버전**과 종속성 트리를 기록
3. 어떤 환경에서든지 **동일한 버전의 패키지를 설치**할 수 있도록 보장
4. 의존성의 하위 패키지 버전까지 정확히 고정(lock)하여, 버전 범위에 따른 설치 변동을 방지
5. 협업과 배포 환경에서 **일관된 의존성 설치**를 가능하게 함
6. **일반적으로 수동 편집하지 않고** npm 명령어에 의해 자동 업데이트됨

### 4.3 왜 두 파일이 모두 필요한가?

> ⚠️ **package-lock.json이 없다면**, `package.json`의 버전 범위에 따라 각 개발 환경에서 설치되는 패키지 버전이 달라질 수 있어 예상치 못한 오류가 발생할 수 있습니다.

**권장사항:**

1. 협업과 배포에서는 **두 파일 모두 함께 Git에 커밋**하는 것이 권장됩니다
2. 이를 통해 팀원 모두가 동일한 의존성 환경에서 작업할 수 있습니다

**비교표:**

| 구분 | package.json | package-lock.json |
|------|--------------|-------------------|
| **관리 주체** | 개발자가 직접 수정 | npm이 자동 생성/관리 |
| **버전 지정** | 범위 지정 (^, ~ 등) | 정확한 버전 고정 |
| **목적** | 필요한 패키지 목록 정의 | 설치된 패키지 버전 잠금 |
| **편집 여부** | 직접 수정 가능 | 수동 편집 비권장 |

---

# ⚛️ React App 구축 방법

## 1. Create React App (CRA)

### 1.1 개요

React 프로젝트를 위한 초기 환경 설정을 자동화해주는 보일러플레이트(boilerplate)입니다.

### 1.2 특징

**장점:**

1. **Zero Configuration**: 별도 설정 없이 React 앱 개발을 바로 시작 가능
2. 복잡한 Webpack, Babel, ESLint, Jest 등의 빌드 도구 설정을 자동 구성
3. 개발 서버 실행, 빌드, 테스트 등 기본 스크립트 내장
4. 최적화된 개발 환경 구성 (Babel, Webpack 기반)
5. **eject 기능**: 필요 시 내부 설정을 추출하여 직접 수정 가능 (한 번 eject하면 되돌리기 어려움)

**단점 (Deprecated):**

1. ⚠️ **2025년 2월, React 공식팀에서 더 이상 권장하지 않는 도구로 선언**
2. 느린 빌드 및 개발 서버 속도 (Webpack 기반)
3. 코드 분할, 데이터 페칭, 서버사이드 렌더링(SSR) 등 최신 기능 부재
4. 더 이상 적극적인 유지보수나 기능 추가가 이루어지지 않음
5. React 19까지는 호환성 업데이트 제공
6. 대신 **Next.js, Vite, Parcel** 같은 최신 프레임워크나 빌드 도구로 전환 권장

### 1.3 CRA를 이용한 React 앱 만들기

```bash
# 1. 프로젝트 만들기
npx create-react-app [프로젝트명]

# 2. 프로젝트 폴더로 이동
cd [프로젝트경로]

# 3. 프로젝트 실행 (개발 서버 실행)
npm start

# 4. 프로젝트 종료 (개발 서버 종료)
# ctrl + c (키 입력)
```

### 1.4 React 앱 구조 (CRA 기준)

```
[프로젝트명]/
├── node_modules/              # 라이브러리 저장소
│                              # (파일이 매우 많아 복사/이동 시 제거 권장)
├── public/                    # 정적 자원 저장소
│   └── index.html             # App 컴포넌트가 렌더링되는 유일한 HTML 파일
├── src/                       # 코드 작성 영역
│   ├── App.js                 # 메인 App 컴포넌트
│   └── index.js               # 앱 진입점 (App 컴포넌트를 렌더링)
├── package.json
└── package-lock.json
```

---

## 2. Vite ⚡ (권장)

### 2.1 개요

최신 프론트엔드 개발을 위한 **빠르고 가벼운** 빌드 도구이자 개발 서버입니다.

### 2.2 특징

1. **초고속 개발 서버**: 파일 저장 시 실시간 반영(HMR)으로 매우 빠른 개발 경험
2. **최신 ES 모듈 기반**: 빠른 번들링과 트랜스파일링 성능
3. **경량화**: 최종 번들 크기가 작고 빌드 속도가 빠름
4. **유연한 설정**: Plug-in이나 옵션 커스터마이즈가 쉬움
5. **다양한 프레임워크 지원**: React, Vue, Svelte 등
6. **React 공식 권장**: CRA 대비 최신 환경으로 신규 프로젝트에 Vite 사용 권장

### 2.3 Vite를 이용한 React 앱 만들기

```bash
# 1. 프로젝트 만들기
npx create-vite@latest [프로젝트명] --template react
# Use rolldown-vite? : No
# Install with npm and start now? : Yes

# 2. 프로젝트 폴더로 이동
cd [프로젝트경로]

# 3. 의존성 설치 (1단계 Install with npm and start now를 Yes할 경우 생략 가능)
npm install

# 4. 프로젝트 실행 (개발 서버 실행)
npm run dev

# 5. 프로젝트 종료 (개발 서버 종료)
# ctrl + c (키 입력)
```

### 2.4 React 앱 구조 (Vite 기준)

```
[프로젝트명]/
├── public/                    # 정적 파일들
├── src/                       # 소스 코드
│   ├── assets/                # 이미지, 폰트 등 리소스
│   ├── App.jsx                # 메인 App 컴포넌트
│   ├── App.css                # App 컴포넌트 스타일
│   ├── index.css              # 전역 스타일
│   └── main.jsx               # 앱 진입점
├── eslint.config.js           # ESLint 설정
├── index.html                 # Vite 진입점 HTML (루트에 위치)
├── package.json               # 프로젝트 설정 및 의존성
├── package-lock.json          # 의존성 잠금 파일
└── vite.config.js             # Vite 설정 파일
```

---

## 💡 추가 참고사항

### 1. 주요 npm 명령어

```bash
npm start          # 개발 서버 시작 (CRA)
npm run dev        # 개발 서버 시작 (Vite)
npm run build      # 프로덕션 빌드
npm test           # 테스트 실행
npm run preview    # 빌드 결과 미리보기 (Vite)
```

### 2. 권장 워크플로우

1. **신규 프로젝트**: Vite 사용 권장 ⚡
2. **기존 CRA 프로젝트**: 유지보수 가능하나 점진적 마이그레이션 고려
3. **대규모 프로젝트**: Next.js 같은 풀스택 프레임워크 검토
