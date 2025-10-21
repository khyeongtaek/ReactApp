import React from "react";
import {RouterProvider} from "react-router-dom";
import {boardRouter} from "./routes/boardRouter";

function App() {

    return (
        <RouterProvider router={boardRouter}/>
    );
}

export default App;
