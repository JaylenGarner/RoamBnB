import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import './CreateBooking.css'

const CreateBooking = ({reviewCount, avgRating}) => {

    const { spotId } = useParams()
    const spot = useSelector((state) => state.spots[spotId])

    const star = <FontAwesomeIcon icon={faStar} className='review-star'></FontAwesomeIcon>


    return (
        <div className='create-booking-panel'>
            <div className='booking-panel-review-info-container'>
            <div className='spot-detail-price-container'>
                <span id='spot-detail-price'>${spot.price} </span>
                <span id='spot-detail-night'>night</span>
            </div>
            <div >
                <span className='create-booking-star'>{star}</span>
                <span className='spot-detail-rating'> {avgRating} · </span>
                <span className='spot-detail-review-count'>{reviewCount} reviews</span>
            </div>
            </div>
            <div className='create-booking-form-container'>
                <form>
                    <div className='create-booking-date-fields-container'>
                        <div className='create-booking-checkin-container'>
                    <span>CHECK-IN</span>
                    <input
                    type="date"
                    className='date-input'
                    >
                        {/* CHECK-IN */}
                    </input>
                    </div>
                    <div className='create-booking-checkin-container create-booking-checkout-container'>
                    <span>CHECK OUT</span>
                    <input
                    placeholder='today'
                    type="date"
                    className='date-input'
                    >
                        {/* CHECK-IN */}
                    </input>
                    </div>
                    </div>
                    <div className='create-booking-submit-button-container'>
                    <button type='submit' className='create-booking-button'>Reserve</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBooking
