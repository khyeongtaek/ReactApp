import { useSearchParams } from 'react-router-dom';
import { useQueryString } from '../hooks/useQueryString';

/*
  useSearchParams()
  1. react-router-dom에서 제공하는 훅으로 경로의 쿼리 스트링(파라미터)에 접근하거나 수정하는 기능을 가집니다.
  2. useSearchParams 훅은 배열을 반환합니다.
    첫 번째 요소는 URLSearchParams 객체이고, 두 번째 요소는 쿼리 스트링을 수정할 수 있는 함수입니다.
*/

/*
  URLSearchParams 객체
  1. 자바스크립트 내장 객체 중 하나로 경로의 쿼리 스트링을 쉽게 다루고 파싱할 수 있게 도와줍니다.
  2. 특정 파라미터 값을 읽거나, 새로운 파라미터를 추가하거나, 기존 파라미터를 수정하는 작업을 할 수 있습니다.
*/

const SearchResult = () => {

  // 방법1. useSearchParams() : react-router-dom의 훅을 활용
  // const [ searchParams ] = useSearchParams();
  // const q = searchParams.get('q') || 'default';

  // 방법2. useQueryString() : 커스텀 훅을 활용
  const queryString = useQueryString();
  const q = queryString.get('q') || 'default'

  return (
    <div>
      <h3>Search Result Page</h3>
      {/*<p>쿼리 스트링 : {searchParams.toString()}</p>*/}
      <p>쿼리 스트링 : {queryString.toString()}</p>
      <p>전달된 검색어는 {q}입니다.</p>
    </div>
  );
  
};

export default SearchResult;