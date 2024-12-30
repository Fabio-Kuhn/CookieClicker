import React from "react";

function Level(props){
    return <div className="demonstration border-left"><h2>Level: {props.level} / {props.levelAmount}</h2></div>
}

export default Level;