import '../Curtain.css'
import React from 'react';
import Login from './Login';

function Curtain() {
    const leftCurtainRef = React.useRef(null);
    const rightCurtainRef = React.useRef(null);
    const ropeRef = React.useRef(null);

    function openCurtain() {
        leftCurtainRef.current.classList.remove("left-curtain-move");
        rightCurtainRef.current.classList.remove("right-curtain-move");
        ropeRef.current.classList.remove("rope-pull");
        setTimeout(() => {
            leftCurtainRef.current.classList.add("left-curtain-move");
            rightCurtainRef.current.classList.add("right-curtain-move");
            ropeRef.current.classList.add("rope-pull");
        }, 100);
    }

    return (
        <div className="curtain-container">
            <div style={{ backgroundImage: "url(/left-curtain.webp)" }} className="left-curtain" ref={leftCurtainRef}></div>
            <div style={{ backgroundImage: "url(/right-curtain.webp)" }} className="right-curtain" ref={rightCurtainRef}></div>
            <div style={{ backgroundImage: "url(/rope.webp)" }} className="rope" onClick={openCurtain} ref={ropeRef}></div>
            <div className='curtain-content'>
                <Login />
            </div>
        </div>
    )
}

export default Curtain;