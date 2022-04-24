import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import Bgimage from './Bgimage';
import DatePicker from 'react-date-picker';
import { BookingAction } from '../store/asyncMethods/actions';
import { REDIRECT_FALSE, REMOVE_BOOK_ERRORS, REMOVE_MESSAGE } from '../store/types/allTypes';



function Booking() {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, bookingErrors, redirect, message } = useSelector(state => state.AllReducer);
    const [date, setDate] = useState('');
    const [state, setState] = useState({
        name: '',
        email: "",
        contact: "",
        address: ""
    });
    const handleInput = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };
    const userBooking = (e) => {
        e.preventDefault();
        const { name, email, contact, address } = state;
        const data = {
            name: name, email: email, contact: contact, address: address, date: date
        }
        dispatch(BookingAction(data));
        console.log(state, date);
        setState({
            name: '',
            email: "",
            contact: "",
            address: "",
        })
        setDate("")
    };

    useEffect(() => {

        if (bookingErrors?.length > 0) {
            bookingErrors.map(error => toast.error(error.msg));
            dispatch({ type: REMOVE_BOOK_ERRORS });
        }
        if (redirect) {
            navigate('/')
            dispatch({ type: REDIRECT_FALSE });
        }
        if (message) {
            toast.success(message);
            dispatch({ type: REMOVE_MESSAGE })
        }
    }, [bookingErrors, redirect, message]);

    return (
        <>
            <Helmet>
                <title>Booking Form</title>
                <meta name="description" content="user can Book us for their Photoshoot and videography and web development " />
            </Helmet>
            <div className="row " style={{ display: 'flex' }} >

                <Toaster
                    position='top-center' reverseOrder={false}
                    toastOptions={{
                        style: {
                            fontSize: '14px',
                        },
                    }}
                />
                <div className="col-6 mt-50 ">
                    <Bgimage />
                </div>
                <div className="col-6 ">
                    <div className="card">
                        <div className="account">

                            <div className="account__section">
                                <form onSubmit={userBooking} >
                                    <div className="group">
                                        <h3 className="form-heading">Book Now</h3>
                                    </div>
                                    <div className="group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" value={state.name} onChange={handleInput} id="name" name="name"
                                            className="group__control" placeholder="eg. John Doe" />
                                    </div>

                                    <div className="group">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" value={state.email} onChange={handleInput} id="email" name="email"
                                            className="group__control" placeholder="abc@example.com" />
                                    </div>

                                    <div className="group">
                                        <label htmlFor="contact">Contact</label>
                                        <input type="text" value={state.contact} onChange={handleInput} id="contact" name="contact"
                                            className="group__control" placeholder="eg. 987654321" />
                                    </div>

                                    <div className="group">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" value={state.address} onChange={handleInput} id="address" name="address"
                                            className="group__control" placeholder="address here..." />
                                    </div>

                                    <div className="group">
                                        <label htmlFor="date">Date</label>
                                        <DatePicker
                                            onChange={setDate}
                                            value={date}
                                        />
                                    </div>

                                    <div className="group">
                                        <input type="submit" value={loading ? "..." : "Book Us Now"} className="btn btn-default btn-block" />
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </>

    )
}

export default Booking 
