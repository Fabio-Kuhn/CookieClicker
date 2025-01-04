import React from "react";

function Elmo(props){ 
    return <div className="elmo" id={`${props.id}`} style={{left: `${props.left}`, top: '0%'}} onClick={() => props.onClick(props.id)}></div>
    
}

export default Elmo;