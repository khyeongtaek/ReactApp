import {Link, Outlet} from "react-router-dom";

const Dashboard = () => {
    const data = {name: 'kim', age: 30};
    return (
        <div>
            <h1>Dashboard</h1>
            <nav>
                <Link to={"general"}>General</Link> | <Link to={"setting"}>Setting</Link>
            </nav>
            <Outlet context={data}/>

        </div>
    );
};

export default Dashboard;