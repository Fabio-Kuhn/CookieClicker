import React from "react";
import ShopItem from "./ShopItem";

function ShopRow(props){
    return <div className="shop-row-container">
        <h4 className="shop-row-title">{props.title}</h4>
        {props.items.map((elem, index) => (<ShopItem key={index} name={elem.name} onClick={elem.onClick} price={elem.price} available={elem.available}/>))}
    </div>
}

export default ShopRow;