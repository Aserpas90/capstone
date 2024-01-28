import { Link }        from "react-router-dom";
import { UserContext } from "./context";
import { useContext }  from "react";

export default function Navbar() {
  //define shared context through application
  const ctx = useContext(UserContext);
  //get the localStorage data from browser to verify if user is logged in
  const loggedInUser = localStorage.getItem('loggedInUser');
  
    return ( loggedInUser === null ? (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
    <div className="navbar-brand">Bad Bank</div>  
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/createAccount">Create Account</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        </ul>
        </div>
        </div>
        </nav>
       ) : (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-brand">Bad Bank</div>  
          <div></div>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/deposit">Deposit</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/withdraw">Withdraw</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/balance">Balance</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/transfer">Tansfer</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/alldata">Account</Link>
              </li>
              <li className="nav-item"
              onClick={()=> { localStorage.removeItem("loggedInUser");
              window.location.reload();                                        
              console.log('User logged out');}}>        
                  <Link className="nav-link" to="/">
                  Logout from: {ctx.user.length > 0 ? <span>{ctx.user.userName}</span> : <span>{ctx.user.userName}</span>}
                  </Link>                
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )    
    );
};