import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MovieContent from '../../MovieContent/MovieContent'
import './HomeTrendingMovies.css'

const HomeTrendingMovies = () => {

    const [ page, setPage] = useState(1)
    const [ content, setContent] = useState([])

    const fetchTrending = async () =>{
        const { data }  = await axios.get(`
        https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
        setContent(data.results)
        setPage(data.total_results)
    }

    useEffect(() => {
        fetchTrending()
    }, [page] )

  return (
    <div className='HomeMoviesContentContainerBG'>
        <div className="topDiv">
            <div className="contentTitle">Trending</div>
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

export default HomeTrendingMovies