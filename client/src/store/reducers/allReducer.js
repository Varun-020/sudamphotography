import {
    CLOSE_LOADER,
    LOGIN_ERRORS,
    LOGOUT,
    REGISTER_ERRORS,
    SET_LOADER,
    SET_TOKEN,
    LOGIN_SUCCESS,
    CONTACT_ERROR,
    REMOVE_ERRORS,
    SET_MESSAGE,
    REMOVE_MESSAGE,
    BOOKING_ERROR,
    REDIRECT_TRUE,
    UPLOAD_ERRORS,
    REMOVE_UPLOAD_ERRORS,
    REDIRECT_FALSE,
    REMOVE_BOOK_ERRORS,
    SET_OFFER,
    SET_OFFER_MESSAGE,
    REMOVE_OFFER_MESSAGE,
    SET_IMAGE,
    CONTACT_LIST,
    BOOKING_LIST
} from "../types/allTypes";

import jwt_decode from 'jwt-decode';

const initState = {
    loading: false,
    registerErrors: [],
    loginErrors: [],
    redirect: false,
    token: '',
    loginSuccess: false,
    bookingErrors: [],
    contactErrors: [],
    uploadErrors: [],
    offer: [],
    images: [],
    contacts: [],
    bookings: [],
    offerMessage: '',
    message: ""
}

const verifyToken = (token) => {
    const decodeToken = jwt_decode(token);
    const expiresIn = new Date(decodeToken.exp * 1000);
    if (new Date() > expiresIn) {
        localStorage.removeItem('myToken');
        return null;
    } else {
        return decodeToken;
    }
};
const token = localStorage.getItem('myToken');
if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
        initState.token = token;
        const { user } = decoded;
        initState.user = user;
    }
}
const AllReducer = (state = initState, action) => {
    if (action.type === SET_LOADER) {
        return { ...state, loading: true };
    }
    else if (action.type === CLOSE_LOADER) {
        return { ...state, loading: false };
    }
    else if (action.type === REGISTER_ERRORS) {
        return { ...state, registerErrors: action.payload };
    }
    else if (action.type === SET_TOKEN) {
        const decoded = verifyToken(action.payload);
        const { user } = decoded;
        return {
            ...state,
            token: action.payload,
            user: user,
            loginErrors: [],
            registerErrors: [],
        };
    }
    else if (action.type === LOGOUT) {
        return {
            ...state,
            token: '',
            user: '',
            loginSuccess: false
        };
    } else if (action.type === LOGIN_ERRORS) {
        return {
            ...state,
            loginErrors: action.payload,
        };
    }
    else if (action.type === LOGIN_SUCCESS) {
        return {
            ...state,
            loginSuccess: true,
        };
    }
    else if (action.type === CONTACT_ERROR) {
        return { ...state, contactErrors: action.payload };
    }
    else if (action.type === REMOVE_ERRORS) {
        return { ...state, contactErrors: [], bookingError: [] };
    }
    else if (action.type === SET_MESSAGE) {
        return { ...state, message: action.payload };
    }
    else if (action.type === REMOVE_MESSAGE) {
        return { ...state, message: "" };
    }
    else if (action.type === BOOKING_ERROR) {
        return { ...state, bookingErrors: action.payload };
    }
    else if (action.type === REMOVE_BOOK_ERRORS) {
        return { ...state, bookingErrors: [] };
    }
    else if (action.type === UPLOAD_ERRORS) {
        return { ...state, uploadErrors: action.payload };
    }
    else if (action.type === REMOVE_UPLOAD_ERRORS) {
        return { ...state, uploadErrors: [] };
    }
    else if (action.type === REDIRECT_TRUE) {
        return { ...state, redirect: true }
    }
    else if (action.type === REDIRECT_FALSE) {
        return { ...state, redirect: false }
    }
    else if (action.type === REMOVE_OFFER_MESSAGE) {
        return { ...state, offerMessage: "" }
    }
    else if (action.type === SET_OFFER) {
        return { ...state, offer: action.payload };
    }
    else if (action.type === SET_IMAGE) {
        return { ...state, images: action.payload };
    }
    else if (action.type === SET_OFFER_MESSAGE) {
        return { ...state, offerMessage: action.payload };
    }
    else if (action.type === CONTACT_LIST) {
        return { ...state, contacts: action.payload };
    }
    else if (action.type === BOOKING_LIST) {
        return { ...state, bookings: action.payload };
    }
    else {
        return state;
    }

}

export default AllReducer