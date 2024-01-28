//importing web components for route assigment.
import Home          from './home';
import CreateAccount from './createAccount';
import Login         from './login';
import Deposit       from './deposit';
import Withdraw      from './withdraw';
import Balance       from './balance';
import Transfer      from './transfer';
import AllData       from './alldata';  
import axios         from 'axios';

import { Route, Routes } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

//initiating the UserContext
export const UserContext = createContext();

// Function to fetch data from Mongodb through API query
// then provide context to be shared all over the application
export function ShareContext({ children }) {
  const [user, setUser] = useState([]);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:80/findaccount');
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }, []);
 
    return(
      <UserContext.Provider value={{ user }}>
        {children}
      </UserContext.Provider>
    )
};

// Function to define the routes for each component
export function PageRouting (){

    return (
        <Routes>
            <Route path="/" exact        element={<Home/>}/>
            <Route path="/login"         element={<Login/>}/>
            <Route path="/createAccount" element={<CreateAccount/>}/>
            <Route path="/deposit"       element={<Deposit/>}/>
            <Route path="/withdraw"      element={<Withdraw/>}/>
            <Route path="/balance"       element={<Balance/>}/>
            <Route path="/transfer"      element={<Transfer/>}/>
            <Route path="/alldata"       element={<AllData/>}/>
        </Routes>
    );
};

// Reusable Card component that can be shared with all pages.
export default function Card (props) {
    
    return (
    <div className={'card'}>
    {<h5 className="card-head">{props.header}</h5>}
    <div className="card-body">
    {<div className="warning-msg" id="createStatus">{props.status}</div>}
    {props.body}
  </div>
</div>
    );
};
