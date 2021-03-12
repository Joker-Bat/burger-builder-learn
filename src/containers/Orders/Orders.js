import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

// Redux
import * as actionCreators from "../../store/actions/index";
import { connect } from "react-redux";

export class Orders extends Component {
  // state = {
  //   orders: [],
  //   loading: true,
  // };

  componentDidMount = () => {
    this.props.fetchOrders();
    console.log(this.props.loading);
  };

  render() {
    return (
      <div>
        {!this.props.loading ? (
          this.props.orders.map((order) => {
            return (
              <Order
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price}
              />
            );
          })
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: () => dispatch(actionCreators.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
