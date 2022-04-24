import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { galleryAction } from '../store/asyncMethods/actions';


function Gallery() {

    const dispatch = useDispatch()
    const { images } = useSelector(state => state.AllReducer);

    useEffect(() => {
        dispatch(galleryAction());
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title>Sudam Photography Gallery</title>
                <meta name="description" content="Sudam Photography Gallery " />
            </Helmet>
            <div className="gallery mt-50">
                <div className="container">
                    <div className="col-12">
                        <div className="gallery_view">
                            {
                                images?.map(pic => (
                                    <div className="gallery_view_image" key={pic._id}>
                                        <a href={`/images/${pic.image}`}>
                                            <img src={`/images/${pic.image}`} alt={pic.image} />
                                        </a>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Gallery

