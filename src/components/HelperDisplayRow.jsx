import React from "react";
import PerkDisplay from "./PerkDisplay";

function HelperDisplayRow(props){
    return <div className="helper-display-row">
        {Array.from({ length: props.helpers }).map((_, i) => (
        <PerkDisplay key={i} />
    ))}
</div>
}

export default HelperDisplayRow;