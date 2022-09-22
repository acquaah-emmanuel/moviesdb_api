import React from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router} from 'react-router-dom'
import Movies from './components/Pages/Movies/movies'
import TvShows from './components/Pages/TvShows/tvshows'
import People from './components/Pages/People/people'
import Home from './components/Pages/Home/home'
import { Route, Routes } from 'react-router-dom';


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/movies' element={<Movies />} />
          <Route path='/tvshows' element={<TvShows />} />
          <Route path='/people' element={<People />} />
      </Routes>
    </Router>
  );
}

export default App;