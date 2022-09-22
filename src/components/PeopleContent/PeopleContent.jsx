import React from 'react'
import { img_300, unavailable } from '../Api/apiConfig'
import '../PeopleContent/PeopleContent.css'


const PeopleContent = ({
    id,
    poster,
    name,
    known_for_department,
    popularity,
    biography
}) => {
  return (
    <div className='mediaContainer'>
      <div className='mediaCard'>
        <img className='poster'
         src={ poster ? `${img_300}/${poster}` : unavailable} alt={name} />
        <div className="movieDetails">
            <p className="title"><b>Name: </b>{name}</p> 
            <p className="date">Known for: {known_for_department}</p>
        </div>
        <span className='rate'>{Math.floor(popularity)}</span>
        <div className="overview">
          <h1>Movies Acted</h1>
          <p>{biography}</p>
        </div>
    </div>
    </div>
  )
}

export default PeopleContent