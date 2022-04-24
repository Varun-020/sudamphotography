
import {
    CLOSE_LOADER,
    LOGIN_ERRORS,
    REGISTER_ERRORS,
    SET_LOADER,
    SET_TOKEN,
    LOGIN_SUCCESS,
    SET_MESSAGE,
    CONTACT_ERROR,
    REDIRECT_TRUE,
    BOOKING_ERROR,
    UPLOAD_ERRORS,
    SET_OFFER,
    SET_OFFER_MESSAGE,
    SET_IMAGE,
    CONTACT_LIST,
    BOOKING_LIST

} from "../types/allTypes";


import axios from "axios";

export const postRegister = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            const { data } = await axios.post('/signup', state, config);
            localStorage.setItem('myToken', data.token);
            dispatch({ type: SET_TOKEN, payload: data.token });
            dispatch({ type: CLOSE_LOADER })
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: REGISTER_ERRORS, payload: error.response.data.errors });

        }
    }
};

export const postLogin = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            dispatch({ type: SET_LOADER })
            const { data } = await axios.post('/login', state, config);
            dispatch({ type: CLOSE_LOADER });
            localStorage.setItem('myToken', data.token);
            dispatch({ type: SET_TOKEN, payload: data.token });
            dispatch({ type: LOGIN_SUCCESS });
        }
        catch (error) {
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: LOGIN_ERRORS, payload: error.response.data.errors });
        }
    }
};

export const PostContact = (state) => {
    return async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            const { data } = await axios.post('/contactUs', state, config);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_MESSAGE, payload: data.msg });
            dispatch({ type: REDIRECT_TRUE });

        } catch (error) {
            console.log(error.response)
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: CONTACT_ERROR, payload: error.response.data.errors })
        }

    }
}

export const BookingAction = (postData) => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADER });
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const { data } = await axios.post('/bookings', postData, config);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_MESSAGE, payload: data.msg });
            dispatch({ type: REDIRECT_TRUE });


        }
        catch (error) {
            console.log("error", error.response.data.errors);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: BOOKING_ERROR, payload: error.response.data.errors });
        }
    }
};

export const uploadImageAction = (postData) => {
    return async (dispatch, getState) => {
        const { AllReducer: { token } } = getState();
        dispatch({ type: SET_LOADER });
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const { data: { msg } } = await axios.post('/uploadImage', postData, config);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: REDIRECT_TRUE });
            dispatch({ type: SET_MESSAGE, payload: msg });

        }
        catch (error) {
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: UPLOAD_ERRORS, payload: error.response.data.errors });
        }
    }

};

export const uploadOfferAction = (postData) => {
    return async (dispatch, getState) => {
        const { AllReducer: { token } } = getState();
        dispatch({ type: SET_LOADER });
        try {
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            const { data: { msg } } = await axios.post('/setOffer', postData, config);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: REDIRECT_TRUE });
            dispatch({ type: SET_MESSAGE, payload: msg });

        }
        catch (error) {
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: UPLOAD_ERRORS, payload: error.response.data.errors });
        }
    }

};


export const fetchOffer = () => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADER });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const { data } = await axios.get("/fetchOffer", config);
            dispatch({ type: CLOSE_LOADER });
            console.log("response", data);
            dispatch({ type: SET_OFFER, payload: data.offer });

        }
        catch (error) {
            dispatch({ type: CLOSE_LOADER });
            console.log(error.message);
        }
    }
};
export const DeleteOffer = (token) => {
    return async (dispatch) => {

        const confirm = window.confirm('Are you really want to delete the offer ?');
        if (confirm) {
            dispatch({ type: SET_LOADER });
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const {
                    data: { msg },
                } = await axios.get(`/delete`, config);

                dispatch({ type: SET_OFFER_MESSAGE, payload: msg });
            } catch (error) {
                dispatch({ type: CLOSE_LOADER });
                console.log(error);
            }
        }
    }
}

export const galleryAction = () => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADER });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const { data } = await axios.get("/gallery", config);
            console.log("Data", data);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: SET_IMAGE, payload: data.gallery });

        }
        catch (error) {
            dispatch({ type: CLOSE_LOADER });
            console.log(error.message);
        }
    }
};

export const FetchContactList = () => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADER });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const { data } = await axios.get("/contactlist", config);
            console.log("Data", data);
            dispatch({ type: CLOSE_LOADER });
            dispatch({ type: CONTACT_LIST, payload: data.contactList });

        }
        catch (error) {
            dispatch({ type: CLOSE_LOADER });
            console.log(error.message);
        }
    }
};
export const FetchBookingList = () => {
    return async (dispatch) => {
        dispatch({ type: SET_LOADER });
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const { data } = await axios.get("/bookinglist", config);
            console.log("Data", data);
            dispatch({ type: BOOKING_LIST, payload: data.bookingList });
            dispatch({ type: CLOSE_LOADER });
        }
        catch (error) {
            dispatch({ type: CLOSE_LOADER });
            console.log(error.message);
        }
    }
};