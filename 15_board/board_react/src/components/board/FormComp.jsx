import React, {useEffect, useState} from 'react';
import useBoardNavigate from "../../hooks/useBoardNavigate";
import {createBoard} from "../../api/boardAPI";


const FormComp = () => {
    const {goToListPage} = useBoardNavigate();
    const [formData, setFormData] = useState({title: '', content: ''});

    useEffect(() => {

    }, [])

    const handleSubmit = async e => {
        e.preventDefault();

        if (!formData.title.trim()) {
            alert('제목을 입력해주세요.');
            return;
        }

        try{
            const responseData = await createBoard(formData);
            responseData.message && alert(responseData.message);
            goToListPage();
        }catch (err) {
            alert(err.message);
        }

    };

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">제목 *</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="content">내용</label>
                    <textarea
                        name="content"
                        id="content"
                        rows="10"
                        cols="30"
                        value={formData.content}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button type="button" onClick={goToListPage}>목록</button>
                    <button type="submit">등록</button>
                </div>
            </form>
        </div>
    );
};

export default FormComp;