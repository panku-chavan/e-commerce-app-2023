import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        let cartItems = localStorage.getItem("cart");
        if (cartItems) {
            setCart(JSON.parse(cartItems));
        }
    }, [])
    return (
        <CartContext.Provider value={[cart, setCart]}>
            {children}
        </CartContext.Provider>
    );
};

//custom hook
export const useCart = () => useContext(CartContext);
