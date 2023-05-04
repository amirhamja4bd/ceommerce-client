
import { useAuth } from '../../context/AuthContext';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import location from '../../assets/img/location.svg'
import Lottie from "lottie-react";
import pass from '../../assets/img/pass.json'

const AddressUpdate = () => {

    const [phone, setPhone ] = useState('');
    const [newPhone, setNewPhone ] = useState('');
    const [name, setName ] = useState('');
    const [fullName, setFullName ] = useState('');
    const [city, setCity ] = useState('');
    const [state, setState ] = useState('');
    const [country, setCountry ] = useState('');
    const [zipCode, setZipCode ] = useState('');
    const [addressData, setAddressData ] = useState('');
 
    const params = useParams();
    const [auth, setAuth ] = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if (auth?.user){
            const { phone, fullName } = auth.user;
            setPhone(phone);
            setName(fullName);
        }
            loadAddress()
    },[auth?.user]);

    const loadAddress = async () => {
        try {
          const { data } = await axios.get("/address", { headers: { Authorization: auth?.token } });
          setAddressData(data);
          setCity(data["0"].city);
          setFullName(data["0"].fullName);
          setNewPhone(data["0"].phone);
          setState(data["0"].state);
          setCountry(data["0"].country);
          setZipCode(data["0"].zipCode);
        } catch (err) {
          console.log(err);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const addressData = { city, state, country, zipCode, fullName: fullName || name, phone: newPhone || phone };
            const {data} = await axios.put(`/addresses/${params.id}`, addressData);
            toast.success('Address Updated Success')
            navigate('/dashboard/user/address');
        }
        catch (error) {
          console.error(error);
          toast.error('Address Create Failed');
        }
      };


    return (
        <div>
            <div className=" d-flex d-flex justify-content-between mx-4 animated fadeInUp">
                
                <div className=" bg-light rounded shadow-sm px-4" style={{width:"49%"}}>
                    
                    <div className="">
                        <h3 className='pt-3'>Update Your Address</h3>
                        <div className=" p-2">
                            <label> Full Name</label>
                            <input  
                                value={ fullName || name}
                                placeholder="Enter Phone Number" 
                                className="form-control bg-light" 
                                onChange={(e)=> setFullName(e.target.value)}
                                type="text"
                                />
                        </div>
                        <div className=" p-2">
                            <label>State</label>
                            <input 
                                value={state}
                                placeholder="Enter State" 
                                className="form-control bg-light" 
                                type="email"
                                onChange={(e)=> setState(e.target.value)}
                            />
                        </div>
                        <div className=" p-2">
                            <label>City</label>
                            <input  
                                value={city}
                                placeholder="Enter City" 
                                className="form-control bg-light" 
                                onChange={(e)=> setCity(e.target.value)}
                                type="text"
                                />
                        </div>
                        
                        <div className=" p-2">
                            <label>Country</label>
                            <input 
                                value={country}
                                placeholder="Enter Country" 
                                className="form-control bg-light" 
                                type="email"
                                onChange={(e)=> setCountry(e.target.value)}
                            />
                            
                        </div>
                        <div className=" p-2">
                            <label>ZipCode</label>
                            <input 
                                value={zipCode}
                                placeholder="Enter Zip Code"  
                                className="form-control bg-light" 
                                type="email"
                                onChange={(e)=> setZipCode(e.target.value)}
                            />
                            
                        </div>
                        <div className=" p-2">
                            <label>Phone Number</label>
                            <input  
                                value={ newPhone || phone}
                                placeholder="Enter Phone Number" 
                                className="form-control bg-light" 
                                onChange={(e)=> setNewPhone(e.target.value)}
                                type="text"
                                />
                        </div>
                        <button onClick={handleUpdate} className=" secondary-btn my-3 ms-2">Update</button>
                    </div>
                </div>
                <div className=" bg-light rounded shadow-sm d-flex align-items-center" style={{width:"49%"}}>
                    <div className="w-50  mx-auto d-block ">
                        <Lottie animationData={pass} loop={true} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressUpdate;




// import { useAuth } from '../../context/AuthContext';
// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AddressUpdate = () => {

//     const [phone, setPhone ] = useState('');
//     const [address, setAddress ] = useState('');
//     const [city, setCity ] = useState('');
//     const [state, setState ] = useState('');
//     const [country, setCountry ] = useState('');
//     const [zipCode, setZipCode ] = useState('');

//     const [auth, setAuth ] = useAuth();
//     const navigate = useNavigate();

//     useEffect(()=>{
//         if (auth?.user){
//             const { phone,  } = auth.user;
//             setPhone(phone);
//         }
//         loadAddress()
//     },[auth?.user]);

//     const loadAddress = async () => {
//         try {
//           const { data } = await axios.get("/address/read", { headers: { Authorization: auth?.token } });
//           setAddress(data.address);
//           setCity(data.city);
//           setState(data.state);
//           setCountry(data.country);
//           setZipCode(data.zipCode);
//         } catch (err) {
//           console.log(err);
//         }
//     };


//     const handleAddress = async (e) =>{
//         e.preventDefault();
//         try{
//             const profileData = new FormData();
//             profileData.append("city", city);
//             profileData.append("state", state);
//             profileData.append("country", country);
//             profileData.append("phone", phone);
//             profileData.append("zipCode", zipCode);
//             profileData.append("address", address);

//             const { data } = await axios.put('/user/address', profileData );
//             if(data?.error){
//             toast.error( data.error);
//             }
//             else{
//                 toast.success("Address Updated")
//                 setAddress('');
//                 setCity('');
//                 setState('');
//                 setCountry('');
//                 setZipCode('');
//                 phone('');
//                 // navigate('/dashboard/user/profile');
//             }
//         }catch(error){
//             toast.error("Address Update Failed");
//         }
//     }
//     return (
//         <div>
//             <div className=" d-flex d-flex justify-content-between">
//                             <div className=" bg-light rounded shadow-sm h-100 px-4" style={{width:"49%"}}>
//                                 <h3 className='pt-3'>Shipping Address</h3>
//                                 <div className="">
//                                     <small>Amir hamza</small><br />
//                                     <small>01756386529</small><br />
//                                     <small>Dhaka, Dhaka - North,Kafrul, Batan Bari, Kafrul, Dhaka Cnt , Dhaka-1206</small>
//                                 </div>
//                             </div>
//                             <div className=" bg-light rounded shadow-sm px-4" style={{width:"49%"}}>
//                                 {city.length > 1 ? (
//                                 <div className="">
//                                     <h3 className='pt-3'>Create Your Address</h3>
//                                     <div className=" p-2">
//                                         <label>Address</label>
//                                         <input  
//                                             value={address}
//                                             placeholder="Enter Address" 
//                                             className="form-control bg-light" 
//                                             onChange={(e)=> setAddress(e.target.value)}
//                                             type="text"
//                                             />
//                                     </div>
//                                     <div className=" p-2">
//                                         <label>City</label>
//                                         <input  
//                                             value={city}
//                                             placeholder="Enter City" 
//                                             className="form-control bg-light" 
//                                             onChange={(e)=> setCity(e.target.value)}
//                                             type="text"
//                                             />
//                                     </div>
//                                     <div className=" p-2">
//                                         <label>State</label>
//                                         <input 
//                                             value={state}
//                                             placeholder="Enter State" 
//                                             className="form-control bg-light" 
//                                             type="email"
//                                             onChange={(e)=> setState(e.target.value)}
//                                         />
//                                     </div>
//                                     <div className=" p-2">
//                                         <label>Country</label>
//                                         <input 
//                                             value={country}
//                                             placeholder="Enter Country" 
//                                             className="form-control bg-light" 
//                                             type="email"
//                                             onChange={(e)=> setCountry(e.target.value)}
//                                         />
                                        
//                                     </div>
//                                     <div className=" p-2">
//                                         <label>ZipCode</label>
//                                         <input 
//                                             value={zipCode}
//                                             placeholder="Enter Zip Code"  
//                                             className="form-control bg-light" 
//                                             type="email"
//                                             onChange={(e)=> setZipCode(e.target.value)}
//                                         />
                                        
//                                     </div>
//                                     <div className=" p-2">
//                                         <label>Phone Number</label>
//                                         <input  
//                                             value={phone}
//                                             placeholder="Enter Phone Number"  
//                                             className="form-control bg-light" 
//                                             onChange={(e)=> setPhone(e.target.value)}
//                                             type="text"
//                                             />
//                                     </div>
//                                     <button onClick={handleAddress} className=" secondary-btn my-3 ms-2">Update</button>
//                                 </div>
//                                 ) : (
//                                 <div className="">
//                                     <h3 className='pt-3'>Update Your Address</h3>
//                                     <div className=" p-2">
//                                         <label>Address</label>
//                                         <input  
//                                             value={address}
//                                             placeholder="Enter Address" 
//                                             className="form-control bg-light" 
//                                             onChange={(e)=> setAddress(e.target.value)}
//                                             type="text"
//                                             />
//                                     </div>
//                                     <div className=" p-2">
//                                         <label>City</label>
//                                         <input  
//                                             value={city}
//                                             placeholder="Enter City" 
//                                             className="form-control bg-light" 
//                                             onChange={(e)=> setCity(e.target.value)}
//                                             type="text"
//                                             />
//                                     </div>
//                                     <div className=" p-2">
//                                         <label>State</label>
//                                         <input 
//                                             value={state}
//                                             placeholder="Enter State" 
//                                             className="form-control bg-light" 
//                                             type="email"
//                                             onChange={(e)=> setState(e.target.value)}
//                                         />
//                                     </div>
//                                     <div className=" p-2">
//                                         <label>Country</label>
//                                         <input 
//                                             value={country}
//                                             placeholder="Enter Country" 
//                                             className="form-control bg-light" 
//                                             type="email"
//                                             onChange={(e)=> setCountry(e.target.value)}
//                                         />
                                        
//                                     </div>
//                                     <div className=" p-2">
//                                         <label>ZipCode</label>
//                                         <input 
//                                             value={zipCode}
//                                             placeholder="Enter Zip Code"  
//                                             className="form-control bg-light" 
//                                             type="email"
//                                             onChange={(e)=> setZipCode(e.target.value)}
//                                         />
                                        
//                                     </div>
//                                     <div className=" p-2">
//                                         <label>Phone Number</label>
//                                         <input  
//                                             value={phone}
//                                             placeholder="Enter Phone Number"  
//                                             className="form-control bg-light" 
//                                             onChange={(e)=> setPhone(e.target.value)}
//                                             type="text"
//                                             />
//                                     </div>
//                                     <button onClick={handleAddress} className=" secondary-btn my-3 ms-2">Update</button>
//                                 </div>
//                                 )}
//                             </div>
                            
//                             </div>
//         </div>
//     );
// };

// export default AddressUpdate;