import Card from "./context";
import { Link } from "react-router-dom";

export default function Home () {
 
    return (
        <Card
        header= "Bad Bank - Trust Us With Your Money"
        status=""
        body= { <>
           
    <div className="landing=page-img">
      <img src={require('../images/bank home.jpg')} className="d-block w-100" alt="landing page"/>
   
</div>
    
     <br/>  
     <div>            
  <Link to="/createAccount"
  style={{background:"black", color:"white", padding:"5px"}} 
         
     >Get Started</Link>

</div>

</>
        }
        ></Card>
    );
};