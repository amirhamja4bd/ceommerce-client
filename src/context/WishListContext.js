// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";

// const WishListContext = createContext();

// const WishListProvider = ({children}) => {
//     const [wishList, setWishList] = useState([]);

//     useEffect(()=>{
//         const loadWishList =async () =>{
//             try{
//                 const  {data}  = await axios.get(`/wishlists`);
//                 setWishList(data);
//                 console.log("wishList",data);
//             }
//             catch(error){
//                 console.log(error);
//             }
//           }
//           loadWishList();
//     },[]);

//     return (
//         <WishListContext.Provider value={[wishList, setWishList]}>
//             {children}
//         </WishListContext.Provider>
//     )
// }
// const useWishList = ()=> useContext(WishListContext);

// export {useWishList, WishListProvider};