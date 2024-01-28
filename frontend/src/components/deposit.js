import Card  from "./context";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext }          from "./context";

export default function Deposit() {
    //import shared context to extract data from
    const ctx = useContext(UserContext);
    const accountNumber = ctx.user.accountNumber;
    // initiate input values
    const [deposit, setDeposit] = useState(0);
    const [warning,setWarning] = useState('');
    const [btnDisable, setBtnDisable] = useState(true);
    const [show, setShow] = useState(true);
    //functions to validate deposit amounts on front end
    const isValidDeposit = (amount) => amount > 0;
    const isValidAmount = (amount) => amount <= 5000;
    //function to handle deposit submission
   function handleDeposit() {
        if(!isValidDeposit(deposit)) {
          setWarning("Your deposit amount must be greater than $0");
          setTimeout(() => setWarning(""), 3000)
          return;
        }
        if(!isValidAmount(deposit)) {
          setWarning("You cannot exceed $5000 limit per deposit.");
          setTimeout(() => setWarning(""), 3000)
          return;
        }
        const response = axios.post('http://localhost:80/deposit', { accountNumber, deposit } );
        console.log(response);
        setShow(false);
        return;    
      }
       //resetting values in case user wishes to make another deposit
      function reset () {
          setDeposit(0);
          setShow(true);
          window.location.reload();
      }
   
    return (
        <Card
        header= "Deposit Page"
        status={warning}
        body= { show ? (<>
          <b>Account Number: {accountNumber}</b> <br/><br/>
          
       <div className='form-fields'>   
       <b> Deposit amount </b>
       <input 
          type="number"
          className="form-control"
          placeholder="Deposit Amount"
          value={deposit}
          onChange={e => {
            setDeposit(Number(e.currentTarget.value));
            e.currentTarget.value < 0 ? setBtnDisable(true) : setBtnDisable(false);  
            }} />
        </div> <br/>

        <div className='form-fields'>
        <button type="submit" 
        className="btn btn-primary mb-3" 
        id="submit"
        onClick={handleDeposit}
        disabled={btnDisable}
        >Deposit</button>
        </div>

        </>) : (<>

        <h5 style={{padding:"5px" ,background: "rgb(26, 181, 96)" ,color: "white"}}>
        Amount of {deposit}$ is credited to: </h5>
        <b>Account number: {accountNumber}</b><br/><br/>

        <div className='form-fields'>       
        <button type="submit" 
        className="btn btn-primary mb-3" 
        onClick={reset}
        >Make New Deposit</button>
        </div>
        </>)
        }
        ></Card>
    );
}
