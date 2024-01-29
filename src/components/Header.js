import { Link , NavLink } from "react-router-dom";
import { auth , provider } from "../firebase/config";
import { signInWithRedirect , signOut , getRedirectResult } from "firebase/auth";
import Logo from "../assets/logo.png";
import { useState } from "react";

export const Header = () => {

  const [isAuth , setIsAuth] = useState( JSON.parse(localStorage.getItem("isAuth")) || false);

  function handleLogin(){
    signInWithRedirect(auth , provider);
    getRedirectResult(auth).then((result) => {
      console.log(result);
      setIsAuth(true);
      localStorage.setItem("isAuth", true);
    })
  }

  function handleLogout(){
    localStorage.setItem("isAuth", false);
    signOut(auth);
    setIsAuth(false);
  }

  return (
    <header>
    <Link to="/" className="logo">
      <img src={Logo} alt="WriteNode Logo" />
      <span>WriteNode</span>
    </Link>
    <nav className="nav">
      <NavLink to="/" className="link" end>Home</NavLink>
      { isAuth ? (
        <>
          <NavLink to="/create" className="link">Create</NavLink>
          <button onClick={handleLogout} className="auth"><i className="bi bi-box-arrow-right"></i> Logout</button> 
        </>                   
      ) : (
        <button onClick={handleLogin} className="auth"><i className="bi bi-google"></i> Login</button>
      ) }        
    </nav>
  </header>
  )
}
