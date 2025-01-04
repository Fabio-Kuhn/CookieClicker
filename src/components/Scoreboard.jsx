import React from "react";
import Perks from "./Perks";
import Score from "./Score";
import Level from "./Level";
function Scoreboard(props){
    return <div className="scoreboard">
        <Perks helpers={props.helpers} potion={props.potion} potionTime={props.potionTime} shieldTime={props.shieldTime} shieldActive={props.shieldActive} helperLevel={props.helperLevel}/>
        <Score score={props.score}/>
        <Level level={props.level} levelAmount={props.levelAmount}/>
    </div>
}

export default Scoreboard;