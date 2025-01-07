import React from "react";

function Elmo(props){ 
    return <div className="elmo" id={props.id} onClick={() => props.onClick(props.id)} style={{left: `${props.left}`, top: `${props.top}`}}></div>
    
}

export default Elmo;