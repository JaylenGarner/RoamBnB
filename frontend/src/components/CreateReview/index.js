import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import './CreateReview.css'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'
import {faStar as faStarLight} from '@fortawesome/free-regular-svg-icons'

const CreateReview = () => {

return (
    <div>
<FontAwesomeIcon icon={faStar} />
<FontAwesomeIcon icon={faStarLight}/>
    </div>
)
}
