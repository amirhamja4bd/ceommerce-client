import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({children}) => {
    const [carts, setCarts] = useState([]);

    useEffect(() => {
        loadCarts();
    }, []);

    // const loadCarts = async (req, res) => {
    //     try {
    //       const { data } = await axios.get("/carts");
    //       setCarts(data);
    //       console.log("CART",data);
    //     } catch (err) {
    //       console.log(err);
    //     }
    // };
    const loadCarts = async () => {
        try {
          const token = localStorage.getItem('token'); // get the token from local storage
          const { data } = await axios.get("/carts", { headers: { Authorization: token } });
          setCarts(data);
          console.log("CART",data);
        } catch (err) {
          console.log(err);
        }
    };

    return (
        <CartContext.Provider value={[carts, setCarts]}>
            {children}
        </CartContext.Provider>
    )
}
const useCart = ()=> useContext(CartContext);

export {useCart, CartProvider};