import axios from 'axios';
import { GET_USER, USER_LOADING, GET_ERRORS, CLEAR_CURRENT_USER  } from './types';

export const getCurrentUser = (id) => dispatch => {
    dispatch(setUserLoading());
    console.log("id", id);
    axios('/getUser',
    {
        method:'get',
        params: {"id":id}
    })
    .then(res=>
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_USER,
            payload: {}
        })
    );
}

//User Loading 
export const setUserLoading = () => {
    return{
        type: USER_LOADING
    }
}

//clear user
export const clearUser = () => {
    return {
        type: CLEAR_CURRENT_USER
    }
}

export const getUser = () => dispatch => {
    dispatch(setUserLoading());
    
    axios('/getUser',
    {
        method:'get',
    })
    .then(res=>
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_USER,
            payload: {}
        })
    );
}