import './App.css';
import { RouterProvider } from 'react-router-dom';
import { userRouter } from './routes/userRouter';

function App() {
  return (
    <div className="App">
      <RouterProvider router={userRouter}/>
    </div>
  );
}

export default App;
