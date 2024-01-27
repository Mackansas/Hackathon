import "./App.css";
import Dice from "./components/Dice";
import { Route, Routes } from "react-router-dom";
import Curtain from "./components/Curtain";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      {/* <CoinToss /> */}
      <NavBar />
      <div className="content" style={{ backgroundImage: "url(/uncle-sam.webp)"}}>
        <Routes>
          <Route path="/" element={<Curtain />} />
          <Route path="/home" element={<Curtain />} />
          <Route path="/dice" element={<Dice amount={5} />} />
          <Route path="/cointoss" element={<Dice />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
