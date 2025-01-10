import React from "react";

function Timer(props){
    const timer = props.timer
    const minutes = Math.floor(timer / 60).toString().padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");

    return <div className="timer-container">
        <p className="timer">{minutes}:{seconds}</p>
    </div>
}

export default Timer;