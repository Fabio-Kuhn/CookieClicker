import React from "react";

function Cookie(props){
    return <div className="cookieOutline" style={{width: `${props.score + 20}px`, height: `${props.score + 20}px`}} onClick={() => props.onCookieClick()}></div>
}

export default Cookie;