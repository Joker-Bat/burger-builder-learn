import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {...};
  //   }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
  };

  updatePurchaseState = (ingredients) => {
    const total = Object.values(ingredients).reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    this.setState({ purchasable: total > 0 });
  };

  addIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    const oldCount = updatedIngredients[type];
    const updatedCount = oldCount + 1;
    updatedIngredients[type] = updatedCount;

    const oldPrice = this.state.totalPrice;
    const currentPrice = INGREDIENT_PRICES[type];
    const newPrice = oldPrice + currentPrice;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    const oldCount = updatedIngredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    updatedIngredients[type] = updatedCount;

    const oldPrice = this.state.totalPrice;
    const currentPrice = INGREDIENT_PRICES[type];
    const newPrice = oldPrice - currentPrice;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert("Your purchase was successful")
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    // Output like this disabledInfo
    // {salad: true, meat: false ...}

    // console.log(disabledInfo);

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            cancelPurchase={this.purchaseCancelHandler}
            continuePurchase = {this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
