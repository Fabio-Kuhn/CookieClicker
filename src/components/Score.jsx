import React from "react";

function Score(props){
    return <div className="demonstration border-left"><h2><span className="scoreboard-categories">Score: </span>{props.score === 0 ? 0 : props.score} / 1000</h2></div>
}

export default Score;