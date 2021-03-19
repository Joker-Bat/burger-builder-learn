import React from "react";

import classes from "./Order.module.css";

const Order = (props) => {
  const ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({
      name: key,
      amount: props.ingredients[key],
    });
  }

  const ingredientsOutput = ingredients.map((ig, index) => (
    <span
      key={index}
      style={{
        display: "inline-block",
        border: "1px solid #ccc",
        padding: "5px",
        margin: "0 8px",
      }}
    >
      {ig.name} ({ig.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      Ingredients: {ingredientsOutput}
      <p>
        Price: <strong>USD {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
