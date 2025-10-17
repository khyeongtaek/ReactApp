import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';
import { userRouter } from './routes/userRouter';

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={userRouter} />
      </Suspense>
    </div>
  );
}

export default App;
