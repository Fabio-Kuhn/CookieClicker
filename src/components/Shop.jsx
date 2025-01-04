import React from "react";
import ShopRow from "./ShopRow";

function Shop(props){
    return <div className="shopContainer">
        <h3>Shop</h3>
        {props.list.map((elem, index) => (<ShopRow key={index} title={elem.title} items={elem.items}/>))}
    </div>
}

export default Shop;