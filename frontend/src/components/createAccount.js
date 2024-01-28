import axios      from 'axios';
import Card       from './context';
import { Link }   from "react-router-dom";
import {useState} from 'react';

export default function CreateAccount() {
    //creating React hooks to track input data
    const [userName, setUserName]         = useState('');
    const [email,setEmail]                = useState('');
    const [password,setPassword]          = useState('');
    const [show, setShow]                 = useState(true);
    const [warning, setWarning]           = useState("");
    const [btnDisabled, setBtnDisabled]   = useState(true);
    const [confirmedPwd, setConfirmedPwd] = useState("");
    //creating input validation functions 
    const isValidName     = (nameInput)     => /^[a-zA-Z ]+$/.test(nameInput);
    const isValidEmail    = (emailInput)    => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput);
    const isValidPassword = (passwordInput) => passwordInput.length >= 8;
    const isConfirmedPwd  = (pwdInput)      =>  pwdInput === password;

    //Function to handle submission of form
    async function handleSubmit (e) {
      e.preventDefault();
      if(!userName || !email || !password || !confirmedPwd){
        setWarning("Please fill out all fields");
        setTimeout(()=> setWarning(""), 3000)
        return;
      }
      if(!isValidName(userName)){
        setWarning("Name cannot include numbers or symbols");
        setTimeout(() => setWarning(""), 3000);
        return;
      }
      if(!isValidEmail(email)){
        setWarning("Please enter a valid E-mail address");
        setTimeout(() => setWarning(""), 3000);
        return;
      }
      if(!isValidPassword(password)){
        setWarning("Password must be at least 8 characters long");
        setTimeout(() => setWarning(""), 3000);
        return;
      }
      if(!isConfirmedPwd(confirmedPwd)){
        setWarning("Doesn't match your password");
        setTimeout(() => setWarning(""), 3000);
        return;
      }
      console.log(userName,email,password);
     
      //posting data to database using http request
     try{
      axios.post('http://localhost:80/create', {userName,email,password});
      setShow(false);
     }catch (error) {
        setWarning('Account already exists');
        console.error(error + "User exists!!!")
    }
  };

  // resetting the form values  
  function clearForm(){
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmedPwd("");
    setShow(true);
  };
  
    return(
      <Card
      header= "Create your account"
      status= {warning}
      body= { show ? (<>
       <form>
     <div className='form-fields'>
     <b>Username:</b><br/>
     <input type="text"
     className="form-control"
     placeholder="Enter Username"
     value={userName}
     onChange={(e) => {setUserName(e.target.value)
     !e.currentTarget.value ? setBtnDisabled(true) : setBtnDisabled(false) }}
     /> 
     </div>

    <div className='form-fields'>
    <b>Email:</b><br/>
    <input type="email"
     className="form-control"
     placeholder="Enter Email"
     value={email}
     onChange={e => {setEmail(e.target.value)
    !e.currentTarget.value ? setBtnDisabled(true) : setBtnDisabled(false)}}
     />
    </div>

    <div className='form-fields'>
    <b>Password:</b><br/>
    <input type="password"
     className="form-control"
     placeholder="Enter Password"
     value={password}
     onChange={e => {setPassword(e.target.value)
     !e.currentTarget.value ? setBtnDisabled(true) : setBtnDisabled(false)}}
     />
    {password.length > 0 &&
     password.length < 8 ?   <span style={{color: "red", fontSize:"14px"}}>Too short!</span> : ""}
    {password.length >= 8  ? <span style={{color: "green", fontSize:"14px"}}>Password is strong</span> : ""}
    </div>

    <div className='form-fields'>
    <b>Confirm Password:</b><br/>
    <input type="password" 
     className="form-control"
     placeholder="Confirm your password"
     value={confirmedPwd}
     onChange={e => {setConfirmedPwd(e.target.value)
     !e.currentTarget.value ? setBtnDisabled(true) : setBtnDisabled(false)}}
     />
    {confirmedPwd === password && confirmedPwd > 0 ?  
    <span style={{color: "green", fontSize:"14px"}}>Password is matching !</span> : ""}
    </div>

    <div className='form-fields'>   
    <button type="submit"
    className="btn btn-primary mb-3"
    onClick={handleSubmit}
    disabled={btnDisabled}
    >Create Account</button>
    </div>
    </form>

    Already have account? <Link to="/login">Login</Link>
        </>) : (<>
          <h4>Congrats, {userName} !</h4>
         <h5>You have successfully created your account</h5>

           <div className='form-fields'>  
          <button type="submit" 
           className="btn btn-primary mb-3">
          <Link to="/login" style={{ color: "white"}}
          >Login</Link>
         </button> 
         </div>

         <div className='form-fields'>
          <button type="submit" 
          className="btn btn-primary mb-3"
          onClick={clearForm}>Add Another Account</button>
          </div>
        </>)
      }></Card>
    );
};
