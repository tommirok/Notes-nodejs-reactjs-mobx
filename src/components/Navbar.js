import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";

 const Navbar =() => {

    return(

      <nav className="navbar">
       <Link to="/"><u>Blog</u></Link>
       <Link to="/login"><u>Login to comment</u></Link>
      </nav>
    )
  }
export default Navbar;
