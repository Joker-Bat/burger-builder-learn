import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

// Axios for database
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
// HOC for errorHandling
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

// Redux
import * as actionTypes from "../../store/actions";
import { connect } from "react-redux";

class BurgerBuilder extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {...};
  //   }

  state = {
    // ingredients: null,
    // totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount = () => {
    // console.log(this.props);
    // axios
    //   .get("/ingredients.json")
    //   .then((res) => {
    //     // console.log(res.data);
    //     this.setState({ ingredients: res.data });
    //     this.updatePurchaseState(this.state.ingredients);
    //     this.updateTotalPrice(this.state.ingredients);
    //   })
    //   .catch((err) => {
    //     this.setState({ error: true });
    //   });
  };

  updatePurchaseState = (ingredients) => {
    const total = Object.values(ingredients).reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    return total > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    // Output like this disabledInfo
    // {salad: true, meat: false ...}

    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            ingredientAdded={this.props.addIngredient}
            ingredientRemoved={this.props.removeIngredient}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          cancelPurchase={this.purchaseCancelHandler}
          continuePurchase={this.purchaseContinueHandler}
          totalPrice={this.props.totalPrice}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    // console.log(disabledInfo);

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingName) =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    removeIngredient: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
