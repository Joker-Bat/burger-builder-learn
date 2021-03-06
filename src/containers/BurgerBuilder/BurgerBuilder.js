import React, { PureComponent } from "react";

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
// import * as actionTypes from "../../store/actions/actionTypes";
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";

export class BurgerBuilder extends PureComponent {
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
      this.props.initIngredients();
  };

  updatePurchaseState = (ingredients) => {
    const total = Object.values(ingredients).reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    return total > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onPurchaseInit();
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

    let burger = this.props.error ? (
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
            isAuth={this.props.isAuthenticated}
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
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingName) => dispatch(actionCreators.addIngredient(ingName)),
    removeIngredient: (ingName) =>
      dispatch(actionCreators.removeIngredient(ingName)),
    initIngredients: () => dispatch(actionCreators.initIngredients()),
    onPurchaseInit: () => dispatch(actionCreators.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actionCreators.setAuthRedirectPath(path)),
  };
};

export default connect(
  matchStateToProps,
  matchDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
