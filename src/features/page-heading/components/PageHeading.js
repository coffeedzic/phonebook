import React from 'react'

import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { setSearch } from '../../../redux/reducers/contacts-reducer'

import '../styles/PageHeading.css'
import searchIcon from '../images/search.svg'

const PageHeading = ({ name, linkTo, linkText, search}) => {
  const searchInput = useSelector(state => state.contacts.search)
  const dispatch = useDispatch()

  const handleSearch = event => {
    dispatch(setSearch(event.target.value))
  }

  return(
    <div id="page-heading" className="page-heading">
      <div className="heading">
        <h2>{name}</h2>
        <Link to={linkTo}>
          <span>{linkText}</span>
        </Link>          
      </div>
      {search ?
      <div className="search-bar">
        <img 
          src={searchIcon}
          alt="search"
        />
        <input
          className="search"
          placeholder="Search by name or phone..."
          value={searchInput}
          onChange={handleSearch}
        />
      </div>
      : null}              
    </div>
  )
}

export default PageHeading