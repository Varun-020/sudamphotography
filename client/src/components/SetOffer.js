import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import Loader from "./Loader";
import { uploadOfferAction, fetchOffer, DeleteOffer } from '../store/asyncMethods/actions';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import {
    REMOVE_UPLOAD_ERRORS,
    REDIRECT_FALSE,
    REMOVE_MESSAGE,
    REMOVE_OFFER_MESSAGE,
} from "../store/types/allTypes"

function SetOffer() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, uploadErrors, redirect, message, offer, offerMessage, token } = useSelector(state => state.AllReducer);

    const [currentImage, setCurrentImage] = useState('Choose Image');
    const [state, setState] = useState('')
    const [imagePreview, setImagePreview] = useState('');
    const fileHandle = e => {
        setState(e.target.files[0])
        if (e.target.files.length !== 0) {
            setCurrentImage(e.target.files[0].name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    const uploadOffer = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('images', state)
        dispatch(uploadOfferAction(formData));

    }
    const deleteOffer = (e) => {
        dispatch(DeleteOffer(token));
    }

    useEffect(() => {
        dispatch(fetchOffer());
    }, [dispatch]);

    useEffect(() => {

        setImagePreview('')
        setState('')
        setCurrentImage("Choose Image")
        if (uploadErrors?.length > 0) {
            uploadErrors.map(error => toast.error(error.msg));
            dispatch({ type: REMOVE_UPLOAD_ERRORS })
        }
        if (redirect) {
            navigate('/dashboard');
            dispatch({ type: REDIRECT_FALSE })
        }
        if (message) {
            toast.success(message)
            dispatch({ type: REMOVE_MESSAGE })
        }
        if (offerMessage) {
            toast.success(offerMessage);
            dispatch({ type: REMOVE_OFFER_MESSAGE })
        }

    }, [uploadErrors, redirect, message, offerMessage]);

    return (
        <div className="create mt-70">
            <Helmet>
                <title>Admin-Upload Offer Image</title>
                <meta name="description" content="Offer uploader from admin side" />
            </Helmet>
            <Toaster
                position='top-center' reverseOrder={false}
                toastOptions={{
                    style: {
                        fontSize: '14px',
                    },
                }}
            />
            {!loading ? <div className="container">
                <form onSubmit={uploadOffer}>
                    <div className="row mr-minus-15">
                        <div className="col-6 p-15">
                            <div className="card">
                                <h3 className="card__h3">Set Offer</h3>
                                <div className="group">
                                    <label className="image__label" htmlFor="image">{currentImage}</label>
                                    <input type="file" id="image" name="image"
                                        className="group__control" onChange={fileHandle} placeholder="" />
                                </div>

                                <div className="group">
                                    <input type="submit" value="Upload" className="btn btn-default btn-block" />
                                </div>
                                {
                                    offer?.length > 0 ?
                                        <div className="group mt-50">
                                            <a href="/setoffer" className="btn btn-default btn-block"
                                                style={{ backgroundColor: "red" }} onClick={deleteOffer}>delete offer</a>
                                        </div>
                                        : ""
                                }

                            </div>
                        </div>
                        <div className="col-6 p-15">
                            <div className="box">
                                <div className="imagePreview">
                                    {imagePreview ? <img src={imagePreview} alt=' here' /> : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div> : <Loader />}
        </div>
    )
}

export default SetOffer
