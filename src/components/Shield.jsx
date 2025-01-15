import React from "react";

function Shield(props){
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const smallCookie = (props.score / 2 + 200) / 4;
    const mediumCookie = (props.score / 2 + 200) / 2;
    const bigCookie = (props.score / 2 + 200);
    var width = 0;
    if(screenWidth > 1280 && screenHeight > 786){
        width = bigCookie + 10;
    } else if(screenWidth > 786){
        width = mediumCookie + 10;
    } else {
        width = smallCookie + 10;
    }
    return <div className="shield" style={{width: `${width}px`, height: `${width}px`}}></div>
};

export default Shield;