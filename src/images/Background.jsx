import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Background = () => { 

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getMoviesData();
    }, [] )

    let base_url = `
    https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`

    const getMoviesData = async  () =>  {
        let {data} = await axios.get(base_url)
        setMovies(data.results);
    }

    const renderBackgrounds = () => (
        movies.map(movie => (
            <BackgroundCard 
                key={movie.id}
                movie={movie}
            />
        ))
    )

  return (
    <div>{renderBackgrounds()}</div>
  )
}

export default Background