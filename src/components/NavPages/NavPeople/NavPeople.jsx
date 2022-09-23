import React, { useState, useEffect } from 'react'
import '../NavPeople/NavPeople.css'
import { FaSearch } from 'react-icons/fa'
import { Link } from "react-router-dom";
import axios from 'axios';
import PeopleContent from '../../PeopleContent/PeopleContent';
import Footer from '../../Footer/Footer'
import { API_KEY } from '../../Api/apiConfig';

let arr = ["Popular", "Latest"]

const NavPeople = () => {
    const [peopleFilter, setPeopleFilter] = useState('popular');
    const [people, setPeople] = useState([]);
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
        getPersonData();
    }, [peopleFilter, currentPageNumber] )

    let base_url = `https://api.themoviedb.org/3/person/${peopleFilter}?api_key=${API_KEY}&language=en-US&page=${currentPageNumber}`

    const setPeopleContent= (personContent) => {
       return setPeopleFilter(personContent.toLowerCase())
    }

    const getPersonData = async  () =>  {
        let {data} = await axios.get(base_url)
        setPeople(data.results);
        setTotalPages(data.total_pages)
    }

    const searchPerson = async (event) => {
        if(event.key==="Enter"){
            setSearchKeyword("");
            base_url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${searchKeyword}`
            let {data} = await axios.get(base_url)
            setPeople(data.results); 
        }
    }

  return (
    <>
    <div className="pageBG">
    <div className='peopleNavTitleBox'>
        <h1 className='navTitle'>People</h1>
        <div className="navControlBox">
            <ul className="navControls">
                {
                    arr.map((value)=>{
                        return(
                            <li className='navItem'>
                                <Link to="" className='navLinks' name={value} onClick={(e)=>{setPeopleContent(e.target.name)}}>{value}</Link>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="navSearchBox">
                <input className='textBox' type="text"  placeholder='Search' onChange={(e) => {setSearchKeyword(e.target.value)}} value={searchKeyword} onKeyPress={searchPerson}/>
                <button className='searchBtn'><FaSearch /></button>
            </div>
        </div>
    </div>
    <div className="ControlsTopDiv">
        <button type="button" className='topButton' disabled={currentPageNumber === 1 ? !isDisabled : isDisabled} onClick={previousPage}>Previous</button>
        <button type="button" className='topButton' disabled={currentPageNumber !== totalPages ? isDisabled : !isDisabled} onClick={nextPage}>Next</button>
    </div>
    <div className="movieContentContainer">
        <div className='trending'>
            {
                (people.length === 0) ? <p className='notFound'>Person not found</p> : people.map(person => <PeopleContent
                    key={person.id} 
                    id={person.id} 
                    poster={person.profile_path} 
                    name={person.name}
                    known_for_department={person.known_for_department}
                    popularity={person.popularity}
                    biography={person.known_for.map((movieActed) => <li>{movieActed.title}</li>)}
                    />)
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

export default NavPeople