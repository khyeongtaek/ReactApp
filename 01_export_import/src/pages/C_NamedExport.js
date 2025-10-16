// 이건 컴포넌트는 아닙니다.

// 값 내보내기
export const PI = 3.141592

// 함수 내보내기
export function add(a, b) {
  return a + b;
}

/*
  Named Export
  1. 이름 있는 내보내기
  2. 하나의 파일에서 여러 개를 내 보낼 수 있습니다.
  3. Default Export와 Named Export가 하나의 파일에 동시에 존재해도 됩니다.
*/