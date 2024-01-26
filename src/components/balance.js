import Card from "./context";
import { useState, useContext, useEffect } from "react";
import { UserContext }          from "./context";

export default function Balance() {
    //retrieve data of (amount) using context hook
    const ctx = useContext(UserContext);
    const balance = ctx.user.balance;
    //setting local time clock which self-updates
    let time = new Date().toLocaleTimeString();
    const [currentTime, setCurrentTime] = useState(time);
    
    useEffect(() => {
        const interval = setInterval(() => {
          let time = new Date().toLocaleTimeString();
          setCurrentTime(time);
        }, 1000);
        // Cleanup the interval when the component is unmounted
        return () => clearInterval(interval);
      }, []);

    return (
        <Card
        header= "Account Balance"
        body= {
            <>
            <h5>Your balance as of <b>{currentTime}</b> is:</h5>
            <h2><b>{balance}$</b></h2> 
            </>        
        }
        ></Card>
    );
}