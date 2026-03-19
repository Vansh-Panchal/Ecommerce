import { DELETE_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, GET_PRODUCTS_BY_CATEGORY_FAILURE, GET_PRODUCTS_BY_CATEGORY_REQUEST, GET_PRODUCTS_BY_CATEGORY_SUCCESS, SEARCH_PRODUCTS_FAILURE, SEARCH_PRODUCTS_REQUEST, SEARCH_PRODUCTS_SUCCESS } from "./ActionType"




const initialState = {
    products: [],
    loading: false,
    product: null,
    error: null,
    categoryProducts: {}

}
export const CustomerProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCTS_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
            return { ...state, loading: true, error: null }
        case GET_PRODUCTS_BY_CATEGORY_REQUEST:
            return { ...state, loading: true, error: null }
        case SEARCH_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case FIND_PRODUCTS_SUCCESS:
            return { ...state, loading: false, error: null, products: action.payload }
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, error: null, product: action.payload }
        case SEARCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload, // plain array from backend
                error: null,
            };

        case GET_PRODUCTS_BY_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryProducts: {
                    ...state.categoryProducts,
                    [action.payload.category]: action.payload.data
                }
            }
        case DELETE_PRODUCTS_SUCCESS:
            return {
                ...state, loading: false, error: null,
                deletedProduct: action.payload
            }
        case FIND_PRODUCTS_FAILURE:
        case FIND_PRODUCT_BY_ID_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case GET_PRODUCTS_BY_CATEGORY_FAILURE:
            return { ...state, loading: false, error: action.payload }
        case SEARCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default
            : return state;
    }
}