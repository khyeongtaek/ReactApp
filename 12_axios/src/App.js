import './App.css';
import {RouterProvider} from "react-router-dom";
import {userRouter} from "./routes/userRouter";
import {Suspense} from "react";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Suspense fallback={<div>Loading...</div>}>
                    <RouterProvider router={userRouter}/>
                </Suspense>
            </header>
        </div>
    );
}

export default App;
