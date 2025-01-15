import React from "react";

function Cookie(props){
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const smallCookie = (props.score / 2 + 200) / 4;
    const mediumCookie = (props.score / 2 + 200) / 2;
    const bigCookie = (props.score / 2 + 200);
    var width = 0;
    if(screenWidth > 1280 && screenHeight > 786){
        width = bigCookie;
    } else if(screenWidth > 786){
        width = mediumCookie;
    } else {
        width = smallCookie;
    }
    return <div className="cookieOutline" style={{width: `${width}px`, height: `${width}px`}} onClick={() => props.onCookieClick()}></div>
}

export default Cookie;