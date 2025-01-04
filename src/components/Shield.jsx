import React from "react";

function Shield(props){
    return <div className="shield" style={{width: `${props.score / 2 + 110}px`, height: `${props.score / 2 + 110}px`}}></div>
};

export default Shield;