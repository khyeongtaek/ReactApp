import {useNavigate, useSearchParams} from "react-router-dom";

const useBoardNavigate = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const currentPageParams = {
        page: Number(searchParams.get('page')) || 1,
        size: Number(searchParams.get('size')) || 5,
        sort: searchParams.get('sort') || 'createdAt,DESC',
    }

    const goToCreatePage = () => {
        navigate(`/boards/create`);
    }

    const goToUpdatePage = (bid) => {
        navigate(`/boards/update/${bid}`);
    }

    const goToDetailPage = (bid) => {
        navigate(`/boards/detail/${bid}`);
    }

    const goToListPage = (pageParams) => {
        const newPageParams = {
            ...currentPageParams,
            ...pageParams,
        };

        const queryString = new URLSearchParams({
            page: newPageParams.page.toString(),
            size: newPageParams.size.toString(),
            sort: newPageParams.sort,
        }).toString();

        navigate(`/boards?${queryString}`);


    }

    return {
        currentPageParams,
        goToCreatePage,
        goToUpdatePage,
        goToDetailPage,
        goToListPage,
    }

}

export default useBoardNavigate;