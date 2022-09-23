import React from 'react'
import { Link } from 'react-router-dom'
import { img_300, unavailable } from '../Api/apiConfig'
import './MovieContent.css'

const MovieContent = ({
    poster,
    title,
    date,
    media_type,
    vote_average,
    overview
}) => {
  return (
    <div className='mediaContainer'>
      <div className='mediaCard'>
        <img className='poster'
         src={ poster ? `${img_300}/${poster}` : unavailable} alt={title} />
        <div className="movieDetails">
            <p className="title"><b>Title: </b>{title}</p>
            <p className="date">Released: {date} <span className='genre'> {media_type}</span></p>
        </div>
        <span className='rate'>{vote_average.toFixed(1)}</span>
        <div className="overview">
          <h1>overview</h1>
          <p>{overview}</p>
          <div className="btns">
            <Link to='/'>Play</Link>
            <Link to='/'>Watch Later</Link>
          </div>
        </div>
    </div>
    </div>
  )
}

export default MovieContent