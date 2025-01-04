import React from "react";
import HelperDisplayRow from "./HelperDisplayRow";
import PotionDisplayRow from "./PotionDisplayRow";
import ShieldDisplayRow from "./ShieldDisplayRow";

function PerkDisplayContainer(props){
    return <div className="perk-display-container">
        <HelperDisplayRow helpers={props.helpers}/>
        {props.potion > 1 && <PotionDisplayRow potion={props.potion} potionTime={props.potionTime}/>}
        {props.shieldActive === true && <ShieldDisplayRow  shieldTime={props.shieldTime} shieldActive={props.shieldActive}/>}
    </div>
}

export default PerkDisplayContainer;