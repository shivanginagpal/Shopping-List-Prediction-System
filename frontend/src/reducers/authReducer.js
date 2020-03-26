import { SET_CURRENT_USER } from '../actions/types';
import { isFieldEmpty } from '../components/auth/HelperApis';

const initialState = {
    isAuthenticated: false,
    user: {}
}

export default function(state = initialState, action){
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isFieldEmpty(action.payload),
                user: action.payload
            }
        default:
            return state;
    }
}