import {useOutletContext} from "react-router-dom";

const Setting = () => {
    const {name, age} = useOutletContext();
    return (
        <div>
            <h3>Setting</h3>
            <ul>
                <li>name: {name}</li>
                <li>age: {age}</li>
            </ul>
        </div>
    );
};

export default Setting;