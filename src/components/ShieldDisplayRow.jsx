import React from "react";
import { useState, useEffect } from 'react';

function ShieldDisplayRow(props){
    const [timeLeft, setTimeLeft] = useState(props.shieldTime);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => Math.max(prevTime - 1000, 0));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    return (
        <div className="perk-display-row shield-display-row">
            <p className="perk-name">🛡️</p>
            <p className="perk-timer">{(timeLeft / 1000).toFixed(0)}</p>
        </div>
    );
}

export default ShieldDisplayRow;