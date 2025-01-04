import React from "react";

function ShopItem(props){
    return <div className={props.available ? "shop-item" : "shop-item shop-item-disabled"} onClick={props.available ? () => props.onClick() : undefined} >
        <h4 className="shop-item-name">{props.name}</h4>
        <p className="shop-item-name">{props.price}</p>
    </div>
}

export default ShopItem;