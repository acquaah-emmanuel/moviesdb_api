import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Genres from '../../Genres/Genres'
import useGenres from '../../../hooks/useGenres'
import './movies.css'
import NavMovies from '../../NavPages/Movies/NavMovies'

const movies = () => {

  const [ page, setPage] = useState(1)
  const [ content, setContent] = useState([])
  const [ numOfPages, setNumOfPages] = useState([])
  const [ selectedGenres, setSelectedGenres] = useState([])
  const [ genres, setGenres] = useState([])
  const genresforURL = useGenres(selectedGenres)


  const fetchMovies = async () =>{
      const { data }  = await axios.get(`
      https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&width_genres=${genresforURL}`)

      setContent(data.results)
      setNumOfPages(data.total_pages)
  }

  useEffect(() => {
      fetchMovies()
  }, [page, genresforURL] )
  return (
    <>
      <NavMovies />
      <Genres
        type='movie'
        selectedGenres = {selectedGenres}
        setSelectedGenres = {setSelectedGenres}
        genres = {genres}
        setGenres = {setGenres}
        setPage = {setPage}
      />
    </>
  )
}

export default movies