// Example for Review Action

import { api } from "../../config/apiConfig";
import { CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS } from "./ActionType";

export const createReview = (resData) => async (dispatch) => {
    dispatch({ type: CREATE_REVIEW_REQUEST });
    try {
        const { data } = await api.post("/api/reviews", resData);
        dispatch({ 
            type: CREATE_REVIEW_SUCCESS, 
            payload: data // This data is what the Reducer uses to update the state
        });
        console.log("Created Review:", data);
    } catch (error) {
        dispatch({ type: CREATE_REVIEW_FAILURE, payload: error.message });
    }
};