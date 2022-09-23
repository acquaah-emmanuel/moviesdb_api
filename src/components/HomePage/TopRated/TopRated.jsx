import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MovieContent from '../../MovieContent/MovieContent'
import { API_KEY } from '../../Api/apiConfig'

const TopRated = () => {
    const [ page, setPage] = useState(1)
    const [ content, setContent] = useState([])

    const fetchPopular = async () =>{
        const { data }  = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
        setContent(data.results)
        setPage(data.total_results)
    }

    useEffect(() => {
        fetchPopular()
    }, [page] )

  return (
    <div className='HomeMoviesContentContainerBG'>
        <div className="topDiv">
            <div className="contentTitle">Top Rated</div>
            <Link to='/movies' className='viewMore'>View More</Link>
        </div>
        <div className="HomeMoviesContentContainer">
            <div className="HomeMoviesContent">
                {
                    content && content.map((c) => (
                        <MovieContent 
                        key={c.id} 
                        id={c.id} 
                        poster={c.poster_path} 
                        title={c.title || c.name || c.original_title} 
                        date={c.first_air_date || c.release_date}
                        media_type={(c.media_type === 'tv' ? 'Tv Series' : 'Movie')}
                        vote_average={c.vote_average}
                        overview={c.overview}
                        />
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default TopRated