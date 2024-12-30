import React from "react";
import Perks from "./Perks";
import Score from "./Score";
import Level from "./Level";
function Scoreboard(props){
    return <div className="scoreboard">
        <Perks />
        <Score score={props.score}/>
        <Level level={props.level} levelAmount={props.levelAmount}/>
    </div>
}

export default Scoreboard;