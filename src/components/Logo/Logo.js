import React from "react";


import burgerIcon from "../../assets/images/28.1 burger-logo.png";
import classes from './Logo.module.css';

const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={burgerIcon} alt="burgerIcon" />
    </div>
  );
};

export default Logo;
