import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  loading: false,
  building: false,
};

//used in BuildControls.js
// export const ingredientsName = Object.keys(initialState.ingredients);

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updateState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updateState);
};

const removeIngredient = (state, action) => {
  const updatedRemoveIngredient = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  const updatedRemoveIngredients = updateObject(
    state.ingredients,
    updatedRemoveIngredient
  );
  const updateRemoveState = {
    ingredients: updatedRemoveIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updateRemoveState);
};

const setIngredients = (state, action) => {
  const updateSetIngredients = updateObject(state.ingredients, {
    salad: action.ingredients.salad,
    cheese: action.ingredients.cheese,
    bacon: action.ingredients.bacon,
    meat: action.ingredients.meat,
  });
  const updateSetState = {
    ingredients: updateSetIngredients,
    totalPrice: 4,
    error: false,
    building: false,
  };
  return updateObject(state, updateSetState);
};

const fetchIngredientsFailed = (state, action) => {
  return updateObject(state, { error: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state, action);

    default:
      return state;
  }
};

export default reducer;
