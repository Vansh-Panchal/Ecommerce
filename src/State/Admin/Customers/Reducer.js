import {
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILURE,

  DELETE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAILURE,

  GET_CUSTOMER_REQUEST,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAILURE

} from "./ActionType";


const initialState = {
  customers: [],
  customer: null,   // single customer for details page
  loading: false,
  error: null
};


export const customerReducer = (state = initialState, action) => {

  switch (action.type) {

    case GET_CUSTOMERS_REQUEST:
    case DELETE_CUSTOMER_REQUEST:
    case GET_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: action.payload
      };

    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customer: action.payload
      };

    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customers: state.customers.filter(
          (customer) => customer.id !== action.payload
        )
      };

    case GET_CUSTOMERS_FAILURE:
    case DELETE_CUSTOMER_FAILURE:
    case GET_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }

};