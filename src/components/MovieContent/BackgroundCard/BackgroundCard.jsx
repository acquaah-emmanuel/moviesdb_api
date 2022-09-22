import React from 'react'
// import './BackgroundCard.css'

const BackgroundCard = ({movie}) => {
    console.log(movie);
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w500"
  return (
    <div id="slider">
        <figure>
            {movie.backdrop_path ? <img src={`${IMAGE_PATH}${movie.backdrop_path}`} alt=""/> : null}
        </figure>
    </div>
  )
}

export default BackgroundCard