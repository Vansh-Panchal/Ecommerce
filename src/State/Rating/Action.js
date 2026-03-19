import { api } from "../../config/apiConfig";
import { CREATE_RATING_FAILURE, CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS } from "./ActionType";

export const createRating = (resData) => async (dispatch) => {
    dispatch({ type: CREATE_RATING_REQUEST  });
    try {
        
        const response = await api.post("/api/ratings", resData);
        dispatch({ type: CREATE_RATING_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: CREATE_RATING_FAILURE  });
        console.log("catch error ", error);
    }
};