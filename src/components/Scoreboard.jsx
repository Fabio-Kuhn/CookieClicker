import React from "react";
import Perks from "./Perks";
import Score from "./Score";
import Level from "./Level";
{/* <h2 className="counter">{props.score}</h2> */}
function Scoreboard(props){
    return <div className="scoreboard">
        <Perks />
        <Score score={props.score}/>
        <Level />
    </div>
}

export default Scoreboard;