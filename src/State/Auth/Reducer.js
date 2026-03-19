import { 
    GET_USER_FAILURE, 
    GET_USER_REQUEST, 
    GET_USER_SUCCESS, 
    LOGIN_FAILURE, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGOUT, 
    REGISTER_FAILURE, 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS 
} from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // Handle all loading states together
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };

        // Handle successful registration and login
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false, // Stops the loading spinner
                jwt: action.payload.jwt,
                user: action.payload, 
                error: null,
            };
        case LOGIN_SUCCESS:
    return {
        ...state,
        isLoading: false,
        jwt: action.payload.jwt,
        user: {
            role: action.payload.role
        },
        error: null
    };

        // Handle profile fetch success
        case GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                error: null,
            };

        // Handle all failure states together
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return {
                ...state,
                isLoading: false, // Stops the loading spinner even on error
                error: action.payload
            };

        // Reset state on logout
        case LOGOUT:
            return {
                ...initialState
            };

        default:
            return state;
    }
};