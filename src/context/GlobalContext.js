
import axios from "axios";
import React, { useContext, useEffect, useState, createContext } from "react";
// import { loadCart } from "../apiRequest";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
  const [countCart, setCountCart] = useState(0);
  const [countWish, setCountWish] = useState(0);

  useEffect(() => {
    checkCountCart();
    checkCountWish();
  }, []);

      const checkCountCart = async () => {
        try {
          const token = localStorage.getItem('token'); 
          const { data } = await axios.get("/carts", { headers: { Authorization: token } });
          setCountCart(
            data?.items?.reduce((acc, product) => acc + product.quantity, 0)
          );
        } catch (err) {
          console.log(err);
        }
    };
      const checkCountWish = async () => {
        try {
          const token = localStorage.getItem('token'); 
          const { data } = await axios.get("/wishlists", { headers: { Authorization: token } });
          setCountWish(
            data?.wishlist?.length
          );
        } catch (err) {
          console.log(err);
        }
    };

  return (
    <GlobalContext.Provider value={{ countCart, countWish, checkCountWish , checkCountCart }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { useGlobalContext, GlobalContextProvider };
