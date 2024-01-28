import Card from "./context";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AllData() {
  //initiate state hook to empty array
  const [user, setUser] = useState([]);
  //using (useEffect) hook to retrieve all data stored in mongodb
  useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:80/all');
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
    //extracting all data coming from the mongodb array
    let users = user.map((user) => (
      
      <li key={user._id}>
      <b>Account Number: </b> {user.accountNumber} <br/>   
      <b>Username:       </b> {user.userName}      <br/> 
      <b>Email:          </b> {user.email}         <br/> 
      <b>Password:       </b> {user.password}      <br/> 
      <b>Balance:        </b> {user.balance}$      <br/> 
      </li>    
    ));

    return (
        <Card
        header= "Account information"
        body= {
            <div>
            <h4>Profile:</h4>
            <ol> {users} </ol>     
          </div> 
        }
        ></Card>
    );
}
