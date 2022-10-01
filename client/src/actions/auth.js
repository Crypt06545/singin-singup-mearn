import { AUTH, ERROR, LOGOUT } from "../constants/actionType";
import * as api from "../api";


export const singUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.singUp(formData);
        dispatch({ type: AUTH, data });
        navigate('/verify');
    } catch (error) {
        console.log(error)
        dispatch({ type: ERROR, status: error.response.status, message: error.response.data.message });
    }
}

export const singIn = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.singIn(formData);
        dispatch({ type: AUTH, data });
        navigate('/');
    } catch (error) {
        dispatch({ type: ERROR, status: error.response.status, message: error.response.data.message });
    }
}

export const deleteAccount = (id, navigate) => async (dispatch) => {
    try {
        const { data } = await api.deleteAccount(id);
        dispatch({ type: LOGOUT });
        navigate('/singin')
    } catch (error) {
        dispatch({ type: ERROR, status: error.response.status, message: error.response.data.message });
    }
}