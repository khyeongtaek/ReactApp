import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const Search = () => {
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    const handleSubmit = e => {
        e.preventDefault();
        if(input){
            navigate(`/searchresult?q=${input}`);
        }

    }

    return (
        <div>
            <h3>Search Page</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={e=> setInput(e.target.value)}
                />
                <button type="submit">검색</button>
            </form>
        </div>
    );
};

export default Search;