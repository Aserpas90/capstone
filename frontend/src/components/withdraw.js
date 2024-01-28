import Card  from "./context";
import axios from "axios";
import { useState, useContext } from "react";
import { UserContext }          from "./context";

export default function Withdraw() {
    //retireve data using React context hook
    const ctx = useContext(UserContext);
    const accountNumber = ctx.user.accountNumber;
    const balance = ctx.user.balance;
    //initiate data values state
    const [withdraw, setWithdraw] = useState(0);
    const [warning,setWarning] = useState('');
    const [btnDisable, setBtnDisable] = useState(true);
    const [show, setShow] = useState(true);
    //validating withdraw amount within front-end
    const isValidWithdraw   = (amount) => amount > 0;
    const isBalanceExceeded = (amount) => amount > balance;
    const isLimitExceeded   = (amount) => amount > 2500;
    //function to handle withdraw submission
    function handleWithdraw(){
        if (!isValidWithdraw(withdraw)) {
          setWarning("Your withdrawal amount must be greater than $0"); 
          setTimeout( () => setWarning(""), 3000)
          return;
      }
       if(isBalanceExceeded(withdraw)) {
          setWarning("Your withdrawal amount cannot exceed your balance !");
          setTimeout(() => setWarning(""), 3000)
          return;
      } 
      if(isLimitExceeded(withdraw)) {
        setWarning("You cannot exceed $2500 limit per withdrawal");
        setTimeout(() => setWarning(""), 3000)
        return;
      } 
      
      const response = axios.post('http://localhost:80/withdraw', { accountNumber, withdraw } );
      console.log(response);
      setShow(false);
      return;
      }

      //resetting values in case user wishes to make another withdraw  
      function reset () {
         setWithdraw(0);
         setShow(true);
         window.location.reload();
      }

    return (
        <Card
        header= "Withdraw Page"
        status={warning}
        body= { show ? (<>

        <b>Account Number: {accountNumber}</b> <br/><br/>
        
        <div className='form-fields'>
        <b> Withdraw amount </b>
        <input 
          type="number"
          className="form-control"
          placeholder="Withdraw Amount"
          value={withdraw}
          onChange={e => {
            setWithdraw(Number(e.currentTarget.value));
            e.currentTarget.value < 0 ? setBtnDisable(true) : setBtnDisable(false);  
            }} />
            </div> <br/>
        
        <div className='form-fields'>
        <button type="submit" 
        className="btn btn-primary mb-3" 
        id="submit"
        onClick={handleWithdraw}
        disabled={btnDisable}
        >Withdraw</button>
        </div>

        </>) : (<>
        
        <h5 style={{padding:"5px" ,background: "rgb(124, 18, 24)" ,color: "white"}}>
        Amount of {withdraw}$ is withdrawn from: </h5>
        <b>Account number: {accountNumber}</b> <br/><br/>

        <div className='form-fields'>                       
        <button type="submit" 
        className="btn btn-primary mb-3" 
        onClick={reset}
        >Withdraw Again</button>
        </div>
        </>)
        }
        ></Card>
    );
}
