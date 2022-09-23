import React, { useState, useEffect } from 'react'
import './NavMovies.css'
import { FaSearch } from 'react-icons/fa'
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';
import MovieContent from '../../MovieContent/MovieContent'
import Footer from '../../Footer/Footer'
import { API_KEY } from '../../Api/apiConfig';

let arr = ["Popular", "Now Playing", "Upcoming", "Top Rated"]



const navMovies = () => {
    const [movieFilter, setMovieFilter] = useState('popular');
    const [movies, setMovies] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("")
    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [isDisabled, setDisabled] = useState(false)

    const nextPage = () => {
        setCurrentPageNumber(currentPageNumber + 1)
        window.scroll(0,0)
      }
  
      const previousPage = () => {
        setCurrentPageNumber(currentPageNumber - 1)
        window.scroll(0,0)
      }

    useEffect(() => {
        getMoviesData();
    }, [movieFilter, currentPageNumber] )

    let base_url = `https://api.themoviedb.org/3/movie/${movieFilter}?api_key=${API_KEY}&language=en-US&page=${currentPageNumber}`

    const setMovieType = (movieType) => {
        if(movieType === 'Top Rated'){
            setMovieFilter('top_rated');
        } else if (movieType === 'Now Playing'){
            setMovieFilter('now_playing');
        } else if (movieType === 'Upcoming'){
            setMovieFilter('upcoming');
        }
         else {
            setMovieFilter(movieType.toLowerCase())
        }

    }

    const getMoviesData = async  () =>  {
        let {data} = await axios.get(base_url)
        setMovies(data.results);
        setTotalPages(data.total_pages)
    }
    
    const searchMovie = async (event) => {
        if(event.key==="Enter"){
            setSearchKeyword("");
           base_url = `https://api.themoviedb.org/3/search/movie?api_key=${ API_KEY}&query=${searchKeyword}`
            let {data} = await axios.get(base_url)
            return setMovies(data.results); 
        }
      }


  return (
    <>
     <div className="pageBG">
     <div className='homeNavTitleBox'>
        <h1 className='navTitle'>Movies</h1>
        <div className="navControlBox">
            <ul className="navControls">
                {
                    arr.map((value)=>{
                        return(
                            <li className='navItem'>
                                <Link to="" className='navLinks' name={value} onClick={(e)=>{setMovieType(e.target.name)}}>{value}</Link>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="navSearchBox">
                <input className='textBox' type="text"  placeholder='Search' onChange={(e) => {setSearchKeyword(e.target.value)}} value={searchKeyword} onKeyPress={searchMovie}/>
                <button className='searchBtn'><FaSearch /></button>
            </div>
        </div>
        <Outlet />
    </div>
    <div className="ControlsTopDiv">
        <button type="button" className='topButton' disabled={currentPageNumber === 1 ? !isDisabled : isDisabled} onClick={previousPage}>Previous</button>
        <button type="button" className='topButton' disabled={currentPageNumber !== totalPages ? isDisabled : !isDisabled} onClick={nextPage}>Next</button>
    </div>
    <div className="movieContentContainer">
            <div className="trending">
                {
                    (movies.length === 0) ? <p className='notFound'>Movie not found</p> : movies.map((c) => (
                        <MovieContent 
                        key={c.id} 
                        id={c.id} 
                        poster={c.poster_path} 
                        title={c.title || c.name || c.original_title} 
                        date={c.first_air_date || c.release_date}
                        media_type='Movie'
                        vote_average={c.vote_average}
                        overview={c.overview}
                        />
                    ))
                }
            </div>
        </div>
     </div>
     <div>
      <div className="paginationControl">
        <button type="button" className='downButton' disabled={currentPageNumber === 1 ? !isDisabled : isDisabled} onClick={previousPage}>Previous</button>
        <span className="CurrentPageNumber">{currentPageNumber}</span>
        <button type="button" className='downButton' disabled={currentPageNumber !== totalPages ? isDisabled : !isDisabled} onClick={nextPage}>Next</button>
      </div>
    </div>
     <Footer />
    </>
  )
}

export default navMovies


