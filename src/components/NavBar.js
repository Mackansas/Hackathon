import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import '../NavBar.css'

const options = ["Home", "Dice", "Cointoss"];
const randomizedOptions = [];
let leftAdjustment = 0;
function NavBar() {
  const [optionsAmount, setOptionsAmount] = React.useState(0);
  const navRef = React.useRef(null);
  const location = useLocation();
  const [selectedOption, setSelectedOption] = React.useState(location.pathname);

  React.useEffect(() => {
    randomizeOptions();
  }, []);

  function randomizeOptions() {
    randomizedOptions.length = 0;
    leftAdjustment = Math.floor(Math.random() * 9);
    for (let i = 0; i < 1000; i++) {
        // if (i === 5 + Math.floor(leftAdjustment / 4.5)) {
        //     randomizedOptions.push(selectedOption);
        //     continue;
        // }
      const randomIndex = Math.floor(Math.random() * options.length);
      setOptionsAmount(optionsAmount + 1);
      randomizedOptions.push(options[randomIndex]);
    }
  }

  function triggerAnimation() {
      navRef.current.classList.remove("nav-roll")
      randomizeOptions();
      setTimeout(() => { 
          navRef.current.classList.add("nav-roll")
          setTimeout(() => {
                // alert(`/${randomizedOptions[5 + Math.floor(leftAdjustment / 4.5)]}`)
                setSelectedOption(`/${randomizedOptions[5 + Math.floor(leftAdjustment / 4.5)]}`.toLowerCase());
            }, 3000);
    }, 100);
  }

  return (
    <>
      <div className="pin">
        <div className="arrow-down"></div>
      </div>
      { selectedOption && selectedOption !== location.pathname && <Navigate to={selectedOption} /> }
      <div key={optionsAmount} className="nav-bar" onClick={triggerAnimation} ref={navRef} style={{left: `-${leftAdjustment}vw`}}>
        {randomizedOptions.map((opt, i) => (
          <div key={`option${i}`} className={`nav-bar-option`}>
            {opt}
          </div>
        ))}
      </div>
    </>
  );
}

export default NavBar;
