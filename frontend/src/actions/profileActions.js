import axios from 'axios';

import { GET_PROFILE, PROFILE_LOADING, GET_ERRORS, CLEAR_CURRENT_PROFILE, GET_EDUCATION, GET_EXPERIENCE, EDU_LOADING, EXP_LOADING } from './types';

export const getCurrentProfile = (id) => dispatch => {
    dispatch(setProfileLoading());
    console.log("id", id);
    axios('/getStudentProfile',
    {
        method:'get',
        params: {"id":id}
    })
    .then(res=>
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_PROFILE,
            payload: {}
        })
    );
}

//Profile Loading 
export const setProfileLoading = () => {
    return{
        type: PROFILE_LOADING
    }
}

//Education Loading 
export const setEduProfileLoading = () => {
    return{
        type: EDU_LOADING
    }
}

//Experience Loading 
export const setExpProfileLoading = () => {
    return{
        type: EXP_LOADING
    }
}

//clear profile
export const clearProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    }
}

export const createProfile = (profileData, history) => dispatch => {
    axios.post('/updateStudentBasic', profileData)
    .then(res => history.push('/studentHome'))
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}
export const addEducationRecord = (educationData, history) => dispatch => {
    axios.post('/updateStudentEducation', educationData)
    .then(res => history.push('/studentHome'))
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const addExperienceRecord = (experienceData, history) => dispatch => {
    axios.post('/updateStudentWorkExp', experienceData)
    .then(res => history.push('/studentHome'))
    .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }))
}

export const getStudentEducation = (id) => dispatch => {
    dispatch(setEduProfileLoading());
    console.log("id", id);
    axios('/getStudentEducation',
    {
        method:'get',
        params: {"id":id}
    })
    .then(res=>
        dispatch({
            type: GET_EDUCATION,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_EDUCATION,
            payload: {}
        })
    );
}

export const getStudentExperience = (id) => dispatch => {
    dispatch(setExpProfileLoading());
    console.log("id", id);
    axios('/getStudentExperience',
    {
        method:'get',
        params: {"id":id}
    })
    .then(res=>
        dispatch({
            type: GET_EXPERIENCE,
            payload: res.data
        })
    )
    .catch(err =>
        dispatch({
            type: GET_EXPERIENCE,
            payload: {}
        })
    );
}