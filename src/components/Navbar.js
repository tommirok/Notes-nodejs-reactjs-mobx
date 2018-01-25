import React, { Component } from 'react';
import { Link } from 'react-router-dom';


 const Navbar = () =>{

    return(
      <nav className="navbar">

        <Link to="/"><u>Blog</u></Link>

        <Link to="/login"><u>Login to comment</u></Link>
      </nav>
    )
  }
export default Navbar;
