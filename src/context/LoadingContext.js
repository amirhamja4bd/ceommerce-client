
// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";

// const LoaderContext = createContext();

// const CartProvider = ({children}) => {
//     const [carts, setCarts] = useState([]);
//     const [countCart, setCountCart] = useState(0);

//     // console.log("CARTcount",countCart);
//     console.log("CARTS",carts);

//     useEffect (() => {
//         loadCarts();
//     }, []);

//     const loadCarts = async () => {
//         try {
//           const token = localStorage.getItem('token'); 
//           const { data } = await axios.get("/carts", { headers: { Authorization: token } });
//           setCarts(data);
//           setCountCart( data?.items?.length );

//           console.log("CARTcount",data?.items?.length);
//         //   console.log("Data",data);
//         } catch (err) {
//           console.log(err);
//         }
//     };

//     return (
//         <LoaderContext.Provider value={[carts, setCarts , countCart, loadCarts]}>
//             {children}
//         </LoaderContext.Provider>
//     )
// }
// const useCart = ()=> useContext(LoaderContext);

// export {useCart, CartProvider};