import Card from "./context";
import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "./context";

export default function Transfer() {
  const ctx = useContext(UserContext);
  const accountNumber = ctx.user.accountNumber;

    const [transfer, setTransfer] = useState(0);
    const [warning,setWarning] = useState('');
    const [btnDisable, setBtnDisable] = useState(true);
    const [show, setShow] = useState(true);
    
    const isValidAmount = (amount) => amount > 0;
   
    function handleTransfer() {

        if(!isValidAmount(transfer)) {
          setWarning("Your transfer amount must greter than 0$");
          setTimeout(() => setWarning(""), 3000)
          return;
        }
        const response = axios.post('http://localhost:80/transfer', { accountNumber, transfer } );
        console.log(response);
        setShow(false);
        return;
      }
  
      function reset () {
          setTransfer(0);
          setShow(true);
      }
    
    return (
        <Card
        header= "Transfer Page"
        text=""
        status={warning}
        body= {
            show ? (<>
        <h3>This function is coming soon!</h3>
        
        Transfer from:   
        <select className="form-select" aria-label="Default select example">
        <option defaultValue="">Select Account Number</option>
        <option value="1">{accountNumber}</option>
        </select> <br/>

        Transfer to:   
        <select className="form-select" aria-label="Default select example">
        <option selected>Select Account Number</option>
        <option value="1"></option>
        </select> <br/>
            
        Amount
        <input 
          type="number"
          className="form-control"
          placeholder="Transfer Amount"
          value={transfer}
          onChange={e => {
            setTransfer(Number(e.currentTarget.value));
            e.currentTarget.value < 0 ? setBtnDisable(true) : setBtnDisable(false);  
            }} /><br />
        
        <button type="submit" 
        className="btn btn-primary mb-3" 
        id="submit"
        onClick={handleTransfer}
        disabled={btnDisable}
        
        >Transfer</button>
            </>) : (<>
                <h5 style={{color: "green"}}>Transfer Successful !</h5>
                
                <h4> Your balance now is: </h4>
                
                <button type="submit" 
                className="btn btn-primary mb-3" 
                onClick={reset}
                >Make New Transfer</button>
            </>)
        }
        ></Card>
    );
}
