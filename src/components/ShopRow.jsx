import React from "react";
import ShopItem from "./ShopItem";

function ShopRow(){
    return <div className="shop-row-container">
        <h4 className="shop-row-title">ShopRowTitle</h4>
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
        <ShopItem />
    </div>
}

export default ShopRow;