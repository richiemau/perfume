import React, { useState } from "react";
import Product from "./Product-item.jsx";
import { FaShoppingCart } from "react-icons/fa";
const products = [
  {
    id: 1,
    name: "kelvin plus",
    description: "A fresh and invigorating scent.",
    price: 38000,
    imageUrl: "/images/1.jpg",
  },
  {
    id: 2,
    name: "Eternality",
    description: "A deep, fresh scent for hug.",
    price: 20000,
    imageUrl: "/images/2.jpg",
  },
  {
    id: 3,
    name: "underwear",
    description: "men's cotton printed boxer .",
    price: 10000,
    imageUrl: "/images/3.jpg",
  },
];
function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (product) => product.id === productToAdd.id
      );
      if (existingProduct) {
        return prevCart.map((product) =>
          product.id === productToAdd.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      } else {
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === productId);

      if (existingProduct.quantity === 1) {
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const getCartTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>KEO4 FOR MY BAE</h1>
        <div className="cart-select">
          <a href="">
            <FaShoppingCart />
            <span className="cart-c">{getCartTotalItems()}</span>
          </a>
        </div>
      </header>
      <main className="content">
        <div className="pro">
          {products.map((product) => (
            <Product
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        {cart.length > 0 && (
          <aside className="cart">
            <h2>YOurCart</h2>

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="item">
                    <span>
                      {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                    </span>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="remove-button"
                    >
                      remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {cart.length > 0 && (
              <p className="total">Total: ${getCartTotalPrice().toFixed(2)}</p>
            )}
          </aside>
        )}
      </main>
    </div>
  );
}
export default App;
