import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { FetchBookingList } from '../store/asyncMethods/actions';
import Loader from "./Loader";

function BookingList() {
    const dispatch = useDispatch();
    const { loading, bookings } = useSelector(state => state.AllReducer);

    useEffect(() => {
        dispatch(FetchBookingList())
    }, [dispatch])

    return (
        <>
            <div className="gallery mt-50">
                <div className="container">
                    <h2 className="contact_list">
                        Booking List
                    </h2>
                    <div className="col-12">
                        <div className="table">
                            <table>
                                <tr className='tableHeader'>
                                    <th>Name</th>
                                    <th>email</th>
                                    <th>Contact</th>
                                    <th>Booking Date</th>
                                    <th>Address</th>
                                    <th>Request Date</th>
                                </tr>
                                {
                                    loading ? <Loader /> :
                                        bookings?.map(contact => (
                                            <tr>
                                                <td>{contact.name}</td>
                                                <td>{contact.email}</td>
                                                <td>{contact.contact}</td>
                                                <td>{contact.date}</td>
                                                <td>{contact.address}</td>
                                                <td>{moment(contact.createdAt).format('MMM Do YYYY, h:mm:ss a')}</td>
                                            </tr>
                                        ))
                                }
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </>

    )
}

export default BookingList