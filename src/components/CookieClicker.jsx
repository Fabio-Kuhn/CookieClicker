import React from "react";
import Cookie from "./Cookie";
import Scoreboard from "./Scoreboard";
import { useState } from "react";
import Shop from "./Shop";

function CookieClicker(){
    const helperLevel = 5;
    const levelAmount = 5;
    const [score, setScore] = useState(0);
    const [helper, setHelper] = useState(10);
    const [level, setLevel] = useState(1);

    function onCookieClick(){
        if(score <= 1000 - (1 * helperLevel * helper) && level <= levelAmount){
            if(helper > 0){
                setScore(score + (1 * helperLevel * helper));
            } else{
                setScore(score + 1);
            }
        } else if (score > 1000 - (1 * helperLevel * helper) && level < levelAmount){
            setLevel(level + 1);
            setScore(0);
        } else if (score > 1000 - (1 * helperLevel * helper) && level === levelAmount){
            alert("Congratulations!!");
            setScore(0);
            setHelper(0);
            setLevel(1);
        }
        
    }

    return <div>
        <Shop />
        <Cookie score={score} onCookieClick={onCookieClick}/>
        <Scoreboard score={score} level={level} levelAmount={levelAmount}/>
    </div>;
}

export default CookieClicker;