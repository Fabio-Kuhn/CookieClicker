import React from "react";

function HomeScreen(props){
    const timer = props.timer
    const minutes = Math.floor(timer / 60).toString().padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");

    return <div className="home-screen-div">
        <h1 className="home-screen-text">{props.text}</h1>
        <p className="home-screen-timer">{ timer === 0 ? "🖱️🍪" : minutes+":"+seconds}</p>
        <button className="home-screen-button" onClick={() => props.onClick()}>play</button>
    </div>
}

export default HomeScreen;