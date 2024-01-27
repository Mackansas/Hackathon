import '../Exit.css'
import React from 'react';
import { useNavigate } from "react-router-dom";

function Exit() {
    const navigate = useNavigate();

    React.useEffect(() => {
        setTimeout(() => {
            navigate("/");
        }, 3000);
    })
    return (
        <div style={{ backgroundImage: "url(/bouncer.webp)" }} className="exit-container">
            <div style={{ backgroundImage: "url(/left-curtain.webp)" }} className="left-curtain-exit"></div>
            <div style={{ backgroundImage: "url(/right-curtain.webp)" }} className="right-curtain-exit"></div>
        </div>
    )
}

export default Exit;