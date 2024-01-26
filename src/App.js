import './App.css';
import Dice from './components/Dice';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <div>Hello world!</div>,
    },
  ]);

  return (
    <div className="App">
        <Dice amount={5} />
    </div>
  );
}

export default App;
