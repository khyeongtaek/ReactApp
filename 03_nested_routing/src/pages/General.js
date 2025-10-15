import {useOutletContext} from "react-router-dom";

const General = () => {
    const {name, age} = useOutletContext();
    return (
        <div>
            <h3>General</h3>
            <ul>
                <li>name: {name}</li>
                <li>age: {age}</li>
            </ul>

        </div>
    );
};

export default General;