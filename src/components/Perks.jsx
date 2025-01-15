import React from "react";
import PerkDisplayContainer from "./PerkDisplayContainer";

function Perks(props){
    return <div className="perks demonstration">
        <h2 className="left-aligned"><span className="scoreboard-categories">Perks</span></h2>
        <PerkDisplayContainer helpers={props.helpers} potion={props.potion} potionTime={props.potionTime}
        shieldTime={props.shieldTime} shieldActive={props.shieldActive}
        elmoTime={props.elmoTime} elmoActive={props.elmoActive}/> 
        {props.helperLevel > 2 && <p className="helper-level-display">x {props.helperLevel}</p>}
    </div>
}

export default Perks;