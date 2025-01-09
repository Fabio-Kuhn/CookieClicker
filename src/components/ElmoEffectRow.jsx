import React from "react";
import { useState, useEffect } from "react";

function ElmoEffectRow(props) {
    const [timeLeft, setTimeLeft] = useState(props.elmoTime);

    // Reset timeLeft whenever props.elmoTime changes
    useEffect(() => {
        setTimeLeft(props.elmoTime);
    }, [props.elmoTime]);

    // Timer logic
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    return (
        <div className="perk-display-row elmo-display-row">
            <div className="elmo-img"></div>
            <p className="perk-timer elmo-timer">{(timeLeft).toFixed(0)}</p>
        </div>
    );
}

export default ElmoEffectRow;