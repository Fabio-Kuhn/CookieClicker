import React from "react";
import PerkDisplayContainer from "./PerkDisplayContainer";

function Perks(props){
    return <div className="perks demonstration"><h2 className="left-aligned">Perks</h2>
        <PerkDisplayContainer helpers={props.helpers} potion={props.potion} potionTime={props.potionTime} shieldTime={props.shieldTime} shieldActive={props.shieldActive}/> 
        {props.helperLevel > 2 && <p className="helper-level-display">x {props.helperLevel}</p>}
    </div>
}

export default Perks;