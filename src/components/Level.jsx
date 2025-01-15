import React from "react";

function Level(props){
    return <div className="demonstration border-left"><h2><span className="scoreboard-categories">Level: </span>{props.level} / {props.levelAmount}</h2></div>
}

export default Level;