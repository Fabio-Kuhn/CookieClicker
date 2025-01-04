import React, { useState, useEffect } from "react";

function PotionDisplayRow(props) {
    const [timeLeft, setTimeLeft] = useState(props.potionTime);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => Math.max(prevTime - 1000, 0));
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    return (
        <div className="perk-display-row">
            <p className="perk-name">{props.potion + "x"}</p>
            <p className="perk-timer">{(timeLeft / 1000).toFixed(0)}</p>
        </div>
    );
}

export default PotionDisplayRow;