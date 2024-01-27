import React from "react";
import "../CoinToss.css"; // Import the CSS file for styling

export const CoinToss = ({ id }) => {
  const [res, setRes] = React.useState("Heads");
  const [altsHidden, setAltsHidden] = React.useState(false);
  const coinRef = React.useRef(null);
  const tossCoin = () => {
    const coinResult = Math.random() < 0.5 ? "Heads" : "Tails";
    setAltsHidden(true);
    coinRef.current.classList.remove("rotate");
    setTimeout(() => {
      coinRef.current.classList.add("rotate");
      setTimeout(() => {
        setAltsHidden(false);
        setRes(coinResult);
      }, 3000);
    }, 100);
  };

  return (
    <>
      <div id={id} className="coin" onClick={tossCoin} ref={coinRef}>
        {altsHidden ? "" : res === "Heads" ? (
          <div className="side heads">H</div>
        ) : (
          <div className="side tails">T</div>
        )}
      </div>
    </>
  );
};

export default CoinToss;
