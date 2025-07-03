import { useState } from "react";
function ProductItem({product, onAddToCart}) {
    const{name, description,price,imageUrl}=product;
    return(
        <div className="goods">
            <img src={imageUrl} alt={name}/>
            <p>{name}</p>
            <p>{description}</p>
            <p>{price}</p>
            <button onClick={()=>onAddToCart(product)}>Add To Cart</button>
        </div>
    );
}
export default ProductItem;
