import "./App.css";
import Dice from "./components/Dice";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import CoinToss from "./components/Cointoss";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Exit from "./components/Exit";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="content" style={{ backgroundImage: "url(/uncle-sam.webp)"}}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/plinko" element={<Login />} />
          <Route path="/dice" element={<Dice amount={5} />} />
          <Route path="/cointoss" element={<CoinToss />} />
          <Route path="/exit" element={<Exit />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
