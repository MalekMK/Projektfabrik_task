import { GET_ITEMS, EDIT_ITEM, ITEMS_LOADING } from "./types";
import axios from "axios";
import { tokenConfig } from "./authActions";


export const getItems = () => (dispatch) => {
dispatch(setItemsLoading());
axios.get("/api/items/").then((res) =>
    dispatch({
    type: GET_ITEMS,
    payload: res.data,
    })
);
};

export const editItem = (id, item) => (dispatch, getState) => {
    axios.post(`/api/items/${id}`, item, tokenConfig(getState)).then(res =>
      dispatch({
        type: EDIT_ITEM,
        payload: res.data
      })
    );
  };

export const setItemsLoading = () => {
return {
    type: ITEMS_LOADING,
};
};
