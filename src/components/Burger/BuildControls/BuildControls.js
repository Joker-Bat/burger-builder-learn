import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

// From reducer state
// import { ingredientsName } from "../../../store/reducers/burgerBuilder";

// const controls = [];

// ingredientsName.forEach((item) => {
//   controls.push({
//     label: item.replace(/^\w/, (c) => c.toUpperCase()),
//     type: item,
//   });
// });

// Controls array look like this
const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: {props.price.toFixed(2)}</p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        {props.isAuth ? "order now" : "sign up to order"}
      </button>
    </div>
  );
};

export default BuildControls;
