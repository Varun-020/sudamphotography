import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { FetchContactList } from '../store/asyncMethods/actions';
import Loader from "./Loader";

function ContactList() {
    const dispatch = useDispatch();
    const { loading, contacts } = useSelector(state => state.AllReducer);

    useEffect(() => {
        dispatch(FetchContactList())
    }, [dispatch])
    return (
        <>
            <div className="gallery mt-50">
                <div className="container">
                    <h2 className="contact_list">
                        Contact List
                    </h2>
                    <div className="col-12">
                        <div className="table">
                            <table>
                                <tr className='tableHeader'>
                                    <th>Name</th>
                                    <th>email</th>
                                    <th>Contact</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Date</th>
                                    {/* moment().format('MMMM Do YYYY, h:mm:ss a') */}
                                </tr>
                                {
                                    loading ? <Loader /> :
                                        contacts?.map(contact => (
                                            <tr>
                                                <td>{contact.name}</td>
                                                <td>{contact.email}</td>
                                                <td>{contact.contact}</td>
                                                <td>{contact.subject}</td>
                                                <td>{contact.message}</td>
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

export default ContactList