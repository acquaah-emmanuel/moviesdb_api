import React from 'react'
import HomePage from '../../HomePage/HomePage'
import Footer from '../../Footer/Footer'
import HomeTrendingMovies from '../../HomePage/HomeTrendingMovies/HomeTrendingMovies'
import MoviesDiscovered from '../../HomePage/UpcomingMovies/UpcomingMovies'
import PopularMovies from '../../HomePage/PopularMovies/PopularMovies'
import TopRated from '../../HomePage/TopRated/TopRated'

const home = () => {
  return (
    <div>
        <HomePage />
        <HomeTrendingMovies />
        <MoviesDiscovered />
        <PopularMovies />
        <TopRated />
        <Footer />
    </div>
  )
}

export default home