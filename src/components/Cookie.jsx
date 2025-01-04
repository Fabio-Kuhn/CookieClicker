import React from "react";

function Cookie(props){
    return <div className="cookieOutline" style={{width: `${props.score / 2 + 100}px`, height: `${props.score / 2 + 100}px`}} onClick={() => props.onCookieClick()}></div>
}

export default Cookie;