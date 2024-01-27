import React from "react";
import Curtain from "./Curtain";
import { Link } from "react-router-dom";
import '../Welcome.css'

function Welcome() {
  return (
    <div>
      <h1>Welcome to UnisaC!</h1>
      <Link className="link" to={"/plinko"}>Start the game!</Link>
      <Curtain />
    </div>
  );
}

export default Welcome;
