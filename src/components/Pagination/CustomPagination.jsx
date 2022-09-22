import React, { useState} from "react"
import './CustomPagination.css'

const CustomPagination = ({ currentPage, totalPages}) => {

    const nextPage = () => {
      if(currentPage > 1 && currentPage > totalPages){
        currentPage++
        window.scroll(0,0)
      } else{
        currentPage = null
      }
    }

    const previousPage = () => {
      if(currentPage  == 1){
        currentPage = 1
      } else{
        currentPage++
      }
    }
    
  return (
    <div>
      <div className="paginationControl">
        <button className="pageBtn" onClick={previousPage}>Previous</button>
        <span className="CurrentPageNumber">{currentPage}</span>
        <button className="pageBtn" onClick={nextPage}>Next</button>
      </div>
    </div>
  )
}

export default CustomPagination