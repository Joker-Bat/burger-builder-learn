import React from "react";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
  const attachedClasses = [
    classes.SideDrawer,
    props.open ? classes.Open : classes.Close,
  ];
  // ...
  return (
    <Aux>
      <Backdrop show={props.open} close={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav onClick={props.closed}>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
