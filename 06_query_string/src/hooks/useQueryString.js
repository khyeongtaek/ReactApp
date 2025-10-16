/*
  useQueryString.js
  1. 쿼리 스트링에 접근할 수 있는 방법을 제공하는 커스텀 훅입니다.
  2. URLSearchParams 객체를 반환하도록 구성합니다.
*/

import { useLocation } from 'react-router-dom';

/*
  useLocation()
  1. react-router-dom에서 제공하는 훅으로 주소(URL)에 대한 다양한 정보를 가져올 수 있습니다.
  2. 현재 경로(pathname), 쿼리 스트링(search) 등 다양한 정보를 포함한 location 객체를 반환합니다.
*/

export function useQueryString() {
  return new URLSearchParams(useLocation().search);
}