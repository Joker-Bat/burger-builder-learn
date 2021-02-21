import React, { Component } from "react";

import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  // componentDidUpdate() {
  //   console.log("[OrderSummary.js] DidUpdate");
  // }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingKey, index) => {
        return (
          <li key={ingKey + index}>
            <span style={{ textTransform: "capitalize" }}>{ingKey}</span> :
            {this.props.ingredients[ingKey]}
          </li>
        );
      }
    );
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>Continue to Checkout?</p>
        <p>
          <strong>Total Price: {this.props.totalPrice.toFixed(2)}</strong>
        </p>
        <Button btnType="Danger" clicked={this.props.cancelPurchase}>
          cancel
        </Button>
        <Button btnType="Success" clicked={this.props.continuePurchase}>
          Proceed
        </Button>
        {/* These [Danger, Success] btnType attribute is based on the CSS classes in Button Component */}
      </Aux>
    );
  }
}

export default OrderSummary;
