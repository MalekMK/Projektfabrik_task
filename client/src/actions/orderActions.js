import {
  GET_ORDERS,
  ADD_ORDER,
  ORDERS_LOADING
} from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getOrders = () => (dispatch, getState) => {
  dispatch(setOrdersLoading());
  axios
    .get("/api/orders", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_ORDERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addOrder = order => (dispatch, getState) => {
  axios
    .post("api/orders/add", order, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ORDER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setOrdersLoading = () => {
  return {
    type: ORDERS_LOADING
  };
};
