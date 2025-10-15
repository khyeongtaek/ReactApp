import React from 'react';
import {useSearchParams} from "react-router-dom";
import {useQueryString} from "./useQueryString";

const SearchResult = () => {
    // const [searchParams] = useSearchParams();
    // const q = searchParams.get('q') || 'default';

    const queryString = useQueryString();
const q = queryString.get('q') || 'default';


    return (
        <div>
            <h3>Search Result Page</h3>
            <p>쿼리 스트링: {queryString.toString()}</p>
            <p>전달된 검색어는 {q}입니다.</p>
        </div>
    );
};

export default SearchResult;