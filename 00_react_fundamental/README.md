# VanillaJS와 React의 차이


## 1. 코드 비교

### 🔸 Vanilla JS 방식

```html
<!DOCTYPE html>
<html>
<body>
  <h2>입력 상자와 DOM 조작</h2>
  <input 
    type="text" 
    id="messageInput" 
    placeholder="메세지를 입력하세요."
  />
  <h5>실시간 입력값: <span id="messageDisplay"></span></h5>

  <script>
    // 1. DOM 요소를 직접 찾아야 함
    const input = document.getElementById('messageInput');
    const display = document.getElementById('messageDisplay');
    
    // 2. 이벤트 리스너 직접 등록
    input.addEventListener('input', (e) => {
      // 3. DOM을 직접 수정
      display.textContent = e.target.value;
    });
  </script>
</body>
</html>
```

**문제점:**
- 각 요소마다 `getElementById`로 DOM을 직접 찾아야 함
- 상태(데이터)가 어디에 있는지 불명확 (input의 value? display의 textContent?)
- 화면 업데이트를 개발자가 직접 명령해야 함
- DOM 조작 코드가 곳곳에 흩어짐

---

### 🔹 React 방식

```jsx
import React, { useState } from 'react';

function Example1() {
  // 1. 상태를 하나의 변수로 관리
  const [message, setMessage] = useState(''); 

  // 2. 이벤트 핸들러
  const handleChange = (e) => {
    setMessage(e.target.value);  // 상태만 변경하면 끝!
  }
  
  // 3. UI는 현재 상태를 기준으로 선언
  return (
    <>
      <h2>입력 상자와 state</h2>
      <input 
        type="text" 
        placeholder="메세지를 입력하세요."
        value={message}
        onChange={handleChange}
      />
      <h5>실시간 입력값: {message}</h5>
    </>
  )
}

export default Example1;
```

**장점:**
- DOM을 직접 찾을 필요 없음
- 상태는 `message` 변수 하나에만 존재 (단일 진실 공급원)
- 상태가 변하면 React가 자동으로 화면 업데이트
- 코드가 간결하고 이해하기 쉬움

---

## 2. 핵심 차이점

### 📌 명령형 vs 선언형 프로그래밍

| 구분 | Vanilla JS (명령형) | React (선언형) |
|------|-------------------|---------------|
| **방식** | "어떻게(How)" 할지 명령 | "무엇을(What)" 보여줄지 선언 |
| **코드** | DOM을 직접 찾고, 직접 수정 | 상태를 정의하고, UI를 선언 |
| **예시** | `display.textContent = value` | `<h5>{message}</h5>` |

```javascript
// 명령형 (Vanilla JS)
// "이렇게 해라" 라고 명령
const display = document.getElementById('display');
display.textContent = '새로운 값';
display.style.color = 'red';

// 선언형 (React)
// "이렇게 보여야 한다" 라고 선언
const [value, setValue] = useState('새로운 값');
return <h5 style={{color: 'red'}}>{value}</h5>
```

---

### 📌 단일 진실 공급원 (Single Source of Truth)

**Vanilla JS: 데이터가 여러 곳에 분산**
```javascript
// 데이터가 어디에 있는가?
- input.value          // input 태그에
- display.textContent  // span 태그에
- let message = '';    // 변수에도?

// 동기화가 깨지기 쉬움!
```

**React: 상태는 오직 한 곳에만**
```javascript
const [message, setMessage] = useState('');  // 유일한 진실

// message가 변하면 모든 곳에 자동 반영
<input value={message} />
<h5>{message}</h5>
<p>{message}</p>
```

---

### 📌 수동 vs 자동 동기화

```javascript
// ❌ Vanilla JS - 수동 동기화
function updateMessage(newValue) {
  input.value = newValue;
  display1.textContent = newValue;
  display2.textContent = newValue;
  display3.textContent = newValue;
  // 하나라도 깜빡하면 버그 발생!
}

// ✅ React - 자동 동기화
function updateMessage(newValue) {
  setMessage(newValue);  // 끝! 나머지는 React가 알아서
}
```

---

## 3. 주요 이점

### ✅ 1. 코드 간결성

**Vanilla JS (10줄)**
```javascript
const input = document.getElementById('input');
const display1 = document.getElementById('display1');
const display2 = document.getElementById('display2');

input.addEventListener('input', (e) => {
  const value = e.target.value;
  display1.textContent = value;
  display2.textContent = value;
});
```

**React (3줄)**
```jsx
const [message, setMessage] = useState('');
// JSX에서 {message} 사용
```

---

### ✅ 2. 유지보수성

**시나리오: 입력값을 5곳에 표시해야 한다면?**

```javascript
// ❌ Vanilla JS - 5군데를 모두 수동 업데이트
input.addEventListener('input', (e) => {
  display1.textContent = e.target.value;
  display2.textContent = e.target.value;
  display3.textContent = e.target.value;
  display4.textContent = e.target.value;
  display5.textContent = e.target.value;  // 실수하기 쉬움!
});

// ✅ React - 상태만 업데이트하면 자동 반영
const [message, setMessage] = useState('');

return (
  <>
    <h5>{message}</h5>
    <p>{message}</p>
    <div>{message}</div>
    <span>{message}</span>
    <strong>{message}</strong>
  </>
);
```

---

### ✅ 3. 버그 감소

**Vanilla JS의 흔한 버그**
```javascript
// DOM 요소가 없을 때
const display = document.getElementById('display');
display.textContent = 'Hello';  // ❌ Error! display is null

// 동기화를 깜빡했을 때
input.addEventListener('input', (e) => {
  display1.textContent = e.target.value;
  // display2 업데이트를 깜빡함! 🐛
});
```

**React는 이런 문제가 없음**
```jsx
const [message, setMessage] = useState('');
// JSX에 {message}만 쓰면 자동 동기화
```

---

## 4. 복잡한 시나리오에서의 차이

### 시나리오: 입력값에 따라 조건부 렌더링

**요구사항:**
- 입력값이 없으면 "입력해주세요" 표시
- 입력값이 있으면 입력값 표시
- 입력값이 10자 이상이면 경고 표시

---

**Vanilla JS 구현**
```javascript
const input = document.getElementById('input');
const display = document.getElementById('display');
const warning = document.getElementById('warning');

input.addEventListener('input', (e) => {
  const value = e.target.value;
  
  // 조건 1
  if (value === '') {
    display.textContent = '입력해주세요';
    display.style.color = 'gray';
  } else {
    display.textContent = value;
    display.style.color = 'black';
  }
  
  // 조건 2
  if (value.length >= 10) {
    warning.style.display = 'block';
    warning.textContent = '10자 이상입니다!';
  } else {
    warning.style.display = 'none';
  }
});
```

---

**React 구현**
```jsx
function Example() {
  const [message, setMessage] = useState('');

  return (
    <>
      <input 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      
      {/* 조건 1: 삼항 연산자로 간결하게 */}
      <h5 style={{color: message ? 'black' : 'gray'}}>
        {message || '입력해주세요'}
      </h5>
      
      {/* 조건 2: 조건부 렌더링 */}
      {message.length >= 10 && (
        <p style={{color: 'red'}}>10자 이상입니다!</p>
      )}
    </>
  );
}
```

**차이점:**
- React는 UI를 **선언적**으로 작성 → 가독성 ⬆️
- Vanilla JS는 DOM 조작 코드가 많음 → 복잡도 ⬆️

---

## 5. 🔄 Virtual DOM: React의 비밀 무기

### Virtual DOM이란?

**Virtual DOM**은 실제 DOM의 가벼운 복사본으로, JavaScript 객체 형태로 메모리에 존재합니다.  
React가 **자동으로 효율적으로** UI를 업데이트할 수 있는 핵심 메커니즘입니다.

### 앞서 설명한 이점들과의 관계

위에서 설명한 React의 모든 이점들은 사실 **Virtual DOM 덕분**에 가능합니다!

```jsx
// 우리가 이렇게 쓰면
const [message, setMessage] = useState('Hello');
return <h5>{message}</h5>;

// React는 내부적으로:
// 1. Virtual DOM 트리를 생성
// 2. 상태 변경 시 새로운 Virtual DOM 트리 생성
// 3. 이전 트리와 비교 (Diffing)
// 4. 변경된 부분만 실제 DOM에 반영 (Reconciliation)
```

---

### DOM 조작의 비용

**왜 Virtual DOM이 필요할까?**

실제 DOM 조작은 매우 **비용이 큰** 작업입니다:

```javascript
// Vanilla JS - 느린 DOM 조작
const list = document.getElementById('list');

// 100개 항목 추가 = 100번의 실제 DOM 조작!
for (let i = 0; i < 100; i++) {
  const item = document.createElement('li');
  item.textContent = `Item ${i}`;
  list.appendChild(item);  // 🐌 매번 Reflow/Repaint 발생
}
```

**DOM 조작이 느린 이유:**
- **Reflow**: 레이아웃 재계산
- **Repaint**: 화면 다시 그리기
- 브라우저 렌더링 엔진의 복잡한 처리 과정

---

### Virtual DOM 작동 방식

#### 1️⃣ **초기 렌더링**

```jsx
// React 컴포넌트
function TodoList() {
  const [todos, setTodos] = useState(['할일1', '할일2']);
  
  return (
    <ul>
      {todos.map(todo => <li key={todo}>{todo}</li>)}
    </ul>
  );
}
```

```
[Virtual DOM 생성]
{
  type: 'ul',
  children: [
    { type: 'li', children: '할일1' },
    { type: 'li', children: '할일2' }
  ]
}

→ 실제 DOM에 반영
```

---

#### 2️⃣ **상태 변경 시**

```jsx
// 할일 추가
setTodos([...todos, '할일3']);
```

```
[새로운 Virtual DOM 생성]
{
  type: 'ul',
  children: [
    { type: 'li', children: '할일1' },  // 변경 없음
    { type: 'li', children: '할일2' },  // 변경 없음
    { type: 'li', children: '할일3' }   // 🆕 새로 추가됨!
  ]
}
```

---

#### 3️⃣ **Diffing 알고리즘**

React는 이전 Virtual DOM과 새 Virtual DOM을 **비교**합니다:

```
[비교 결과]
✓ ul - 변경 없음
  ✓ li(할일1) - 변경 없음
  ✓ li(할일2) - 변경 없음
  ➕ li(할일3) - 새로 추가됨! ← 이것만 실제 DOM에 추가
```

---

#### 4️⃣ **효율적인 DOM 업데이트**

```javascript
// React는 변경된 부분만 실제 DOM에 반영
// = 1번의 DOM 조작만 발생!
realDOM.querySelector('ul').appendChild(
  document.createElement('li').textContent = '할일3'
);
```

---

### Vanilla JS vs React (Virtual DOM 관점)

#### 시나리오: 1000개 항목 중 1개만 변경

**Vanilla JS**
```javascript
// 최악의 경우: 전체 다시 렌더링
list.innerHTML = '';  // 🐌 1000개 모두 삭제
items.forEach(item => {
  list.appendChild(createItem(item));  // 🐌 1000개 모두 다시 추가
});

// 최선의 경우: 개발자가 직접 찾아서 수정
const targetItem = list.children[500];  
targetItem.textContent = '새로운 값';  // ✅ 1개만 수정 (하지만 직접 찾아야 함)
```

**React (Virtual DOM)**
```jsx
// 개발자는 상태만 변경
const newItems = [...items];
newItems[500] = '새로운 값';
setItems(newItems);

// React는 자동으로:
// 1. Virtual DOM 비교
// 2. 500번째 항목만 변경된 것 감지
// 3. 해당 항목만 실제 DOM 업데이트 ✅
```

---

### Virtual DOM의 이점

| | Vanilla JS | React (Virtual DOM) |
|---|------------|---------------------|
| **업데이트 방식** | 개발자가 직접 찾아서 수정 | 자동으로 변경사항 감지 |
| **성능 최적화** | 개발자가 직접 해야 함 | 자동으로 최적화 |
| **DOM 조작 횟수** | 많음 (비효율적) | 최소화 (효율적) |
| **개발 편의성** | 복잡함 | 간단함 |

---

### 실제 예시: 입력값 실시간 표시

우리의 `Example1.jsx` 코드를 다시 보면:

```jsx
function Example1() {
  const [message, setMessage] = useState(''); 
  
  return (
    <>
      <input 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <h5>실시간 입력값: {message}</h5>
    </>
  )
}
```

**내부에서 일어나는 일:**

1. 사용자가 'H' 입력
2. `setMessage('H')` 호출
3. React가 새로운 Virtual DOM 생성
   ```
   {
     type: 'input',
     props: { value: 'H' }
   }
   {
     type: 'h5',
     children: '실시간 입력값: H'
   }
   ```
4. 이전 Virtual DOM과 비교 (Diffing)
5. **변경된 부분만** 실제 DOM 업데이트
   - `<input>` value: '' → 'H'
   - `<h5>` textContent: '실시간 입력값: ' → '실시간 입력값: H'

---

### 비유로 이해하기

**Vanilla JS = 집 전체를 부수고 다시 짓기**
```
문 하나 바꾸려고 → 집 전체 철거 후 재건축 🏚️→🏗️→🏠
```

**React (Virtual DOM) = 설계도로 비교 후 필요한 부분만 수리**
```
1. 기존 설계도 (이전 Virtual DOM)
2. 새 설계도 (새 Virtual DOM)
3. 비교해서 차이점 발견 (Diffing)
4. 차이나는 부분만 수리 (변경된 DOM만 업데이트) 🔧
```

---

### 정리: Virtual DOM과 React의 이점

앞서 설명한 React의 모든 특징들은 Virtual DOM과 연결됩니다:

✅ **자동 동기화** → Virtual DOM이 변경사항 추적  
✅ **선언적 프로그래밍** → Virtual DOM이 실제 DOM 조작 추상화  
✅ **효율적인 렌더링** → Diffing 알고리즘으로 최소한의 DOM 조작  
✅ **개발 편의성** → 개발자는 상태만 관리, 나머지는 React가 처리  

---

### 🎯 핵심 포인트

> React에서 `setState`를 호출하면:
> 1. 새로운 Virtual DOM 생성 🌲
> 2. 이전 Virtual DOM과 비교 (Diffing) 🔍
> 3. 변경된 부분만 실제 DOM에 반영 (Reconciliation) ⚡
> 
> **결과**: 최소한의 DOM 조작으로 최대의 성능!

---

## 6. 정리

### 🎯 핵심 개념

| | Vanilla JS | React |
|---|------------|-------|
| **패러다임** | 명령형 (How) | 선언형 (What) |
| **상태 관리** | DOM에 분산 | useState로 중앙화 |
| **화면 업데이트** | 수동 (직접 DOM 조작) | 자동 (React가 처리) |
| **렌더링 최적화** | 개발자가 직접 구현 | Virtual DOM이 자동 처리 |
| **코드량** | 많음 | 적음 |
| **유지보수** | 어려움 | 쉬움 |
| **버그 발생률** | 높음 | 낮음 |
| **성능** | 비효율적 (전체 DOM 조작) | 효율적 (변경된 부분만) |

---

### 💡 비유

**Vanilla JS = 수동 운전**
- 기어를 직접 바꾸고
- 클러치를 직접 밟고
- 모든 것을 운전자가 제어

**React = 자동 운전**
- 상태(가속 페달)만 조작하면
- 나머지는 시스템이 알아서 처리

---

### 🔑 핵심 요약

React의 3대 핵심 메커니즘:

1. **State (상태 관리)** 
   - `useState`로 데이터를 중앙 관리
   - 단일 진실 공급원 (Single Source of Truth)

2. **Virtual DOM (효율적인 렌더링)**
   - 메모리상의 가상 DOM으로 변경사항 추적
   - Diffing 알고리즘으로 최소한의 DOM 조작

3. **선언적 UI (Declarative UI)**
   - "무엇을(What)" 보여줄지만 선언
   - "어떻게(How)"는 React가 알아서 처리

---

### 💬 자주 묻는 질문

**Q: Virtual DOM이 항상 Real DOM보다 빠른가요?**
> A: 아닙니다! 간단한 변경의 경우 Real DOM 직접 조작이 더 빠를 수 있습니다.  
> Virtual DOM의 진짜 가치는 **복잡한 UI에서 개발 편의성을 유지하면서도 합리적인 성능**을 제공한다는 점입니다.

**Q: setState를 호출하면 즉시 반영되나요?**
> A: 아닙니다! React는 여러 setState를 **배치(batch)** 처리합니다.  
> 성능 최적화를 위해 여러 변경사항을 모아서 한 번에 렌더링합니다.

**Q: 모든 상태 변경이 리렌더링을 일으키나요?**
> A: 기본적으로 그렇습니다. 하지만 React는 **같은 값**으로 setState하면 리렌더링하지 않습니다 (얕은 비교).