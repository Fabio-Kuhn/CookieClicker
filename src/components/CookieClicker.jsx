import React from "react";
import Cookie from "./Cookie";
import Scoreboard from "./Scoreboard";
import { useState } from "react";

function CookieClicker(){
    const [score, setScore] = useState(0);
    const [helper, setHelper] = useState(3);

    function onCookieClick(){
        if(helper > 0){
            setScore(score + (1 * 2 * helper));
        } else{
            setScore(score + 1);
        }
    }

    return <div>
        <Cookie score={score} onCookieClick={onCookieClick}/>
        <Scoreboard score={score}/>
    </div>;
}

export default CookieClicker;