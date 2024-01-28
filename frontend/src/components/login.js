import Card         from "./context";
import axios        from "axios";
import { useState } from "react";
import { Link }     from "react-router-dom";
import {LoginWithGoogle, LogoutWithGoogle} from "./auth";


export default function Login() {
    //initiating data state React hook   
    const [show, setShow]         = useState(true);
    const [warning, setWarning]   = useState("");
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    
    //finction to validate email format on front-end
    const isValidEmail = (emailInput) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
   
    //async function to handle login
    async function handleLogin(){
        
        if(!email || !password) {
            setWarning("Please enter your Email and Password to login");
            setTimeout(()=> setWarning(''), 3000);
            return;
        }
        if(!isValidEmail(email)) {
            setWarning("Please enter a valid Email address")
            setTimeout(()=> setWarning(''), 3000);
            return;
        }
        //axios query to get data from mongodb and validate credentials
        try{
           await axios.post('http://localhost:80/login', { email, password } )
            console.log("User logged in");  
            setShow(false); 
            localStorage.setItem("loggedInUser", email); 
        } catch (error){
           setWarning('Login failed. Please check your credentials.');
           setTimeout(()=> setWarning(''), 3000);
            console.error(error + "Login failed")};        
      };

    return (
        <Card
        header= "Login"
        status= {warning}
        body= { show ? (
        <>
        <div className='form-fields'>
        <b>Email:</b>
        <input type="text" 
               className="form-control"
               placeholder="Enter your Email"
               value={email}
               onChange={e => setEmail(e.currentTarget.value)}/>
       </div>

       <div className='form-fields'>
       <b>Password:</b>
        <input type="password" 
               className="form-control"
               placeholder="Enter your Password"
               value={password}
               onChange={e => setPassword(e.currentTarget.value)}/>
       </div>

       <div className='form-fields'>
       <button type="submit" 
             className="btn btn-primary mb-3"
             onClick={handleLogin}
             >Login</button>
        </div>

        <div className='form-fields'>
        <button type="submit" 
             className="google-login-button"
             onClick={LoginWithGoogle}> 
         Login with Google
         <img src={require('../images/google icon.png')} alt="Google Icon" className="google-icon"/>
         </button> 
        </div>

        </> ):( <>
          
         <h3>Welcome back, {email} ! </h3>
         <h5>You're now logged in</h5>
         <div className='form-fields'>
         <button type="submit" 
                 className="btn btn-primary mb-3"
                 onClick={()=> window.location.reload()}
             ><Link to="/deposit" 
                 style={{ color: "white"}}
             >Start transacting</Link>
         </button>
         </div>
        </>
        )}
        ></Card>
    );
};
