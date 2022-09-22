import React, { useState, useEffect, useRef } from 'react'
import './HomePage.css'
import axios from 'axios';
import { FaSearch } from 'react-icons/fa'
import MovieContent from '../MovieContent/MovieContent';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState("")

    useEffect(() => {
        getMoviesData();
    }, [] )

    let base_url = `https://api.themoviedb.org/3/search/movie?api_key=3b92f42dd5e2d7a9ab0a778973611246&query=${searchKeyword}`

    const getMoviesData = async  () =>  {
      let {data} = await axios.get(base_url)
      setMovies(data.results);
  }

  

  const searchMovie = async (event) => {
    if(event.key==="Enter"){
        setSearchKeyword("");
       let base_url = `https://api.themoviedb.org/3/search/movie?api_key=3b92f42dd5e2d7a9ab0a778973611246&query=${searchKeyword}`
        let {data} = await axios.get(base_url)
        return setMovies(data.results)
    }
  }

  const content = useRef()
  const homeSearchBox = useRef()
  const homePage = useRef()
  const h1 = useRef()
  const h3 = useRef()
  const homePageBox = useRef()

  function searchRoll(){
    h1.current.style.fontSize = '2rem'
    h3.current.style.display = 'none'
    h1.current.style.marginTop = '-9rem'
    homeSearchBox.current.style.marginBottom = '3rem'
    homePage.current.style.height = '50vh'
    homePageBox.current.style.width = '100%'
  }
  
  return (
    <>
        <section className='homePage' ref={homePage}>
            <div className="homePageBox" ref={homePageBox}>
              <div className="coat" ref={content}>
                <h1 ref={h1}>Unlimited movies, TV shows, and more.</h1>
                <h3 ref={h3}>Join the hub to enjoy more...</h3>
              </div>
              <div className="homeSearchBox" ref={homeSearchBox}>
                <input className='textBox' type="text"  placeholder='Search for a movie, tv show, person...'
                 onClick={searchRoll}onChange={(e) => {setSearchKeyword(e.target.value)}} value={searchKeyword} onKeyPress={searchMovie} />
                <button className='searchBtn'><FaSearch /></button>
            </div>
            </div>
        </section>
        <div className="movieContentContainer">
            <div className="trending">
                {
                    movies && movies.map((c) => (
                        <MovieContent 
                        key={c.id} 
                        id={c.id} 
                        poster={c.poster_path} 
                        title={c.title || c.name || c.original_title} 
                        date={c.first_air_date || c.release_date}
                        media_type={c.media_type}
                        vote_average={c.vote_average}
                        overview={c.overview}
                        />
                    ))
                }
            </div>
        </div>
    </>
  )
}

export default HomePage