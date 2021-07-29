import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import defaultContactPicture from '../images/default.jpg'

const ContactItem = ({contactId, contactName, contactNumber, contactPicture}) => {
  const hide = {display: 'none'}
  const search = useSelector(state => state.contacts.search)
  const [inSearch, setInSearch] = useState(true)

  useEffect(() => {
    if(!contactName.includes(search) && !contactNumber.includes(search)) {
      setInSearch(false)
    } else {
      setInSearch(true)
    }
  }, [search])

  return(
    <div style={inSearch ? null : hide} className="contact-item">
      <Link to={"/contact/" + contactId}>
      <div className="image">
        <img src={contactPicture ? 'api/images/' + contactPicture : defaultContactPicture} alt="Profile"></img>
      </div>
      </Link>        
      <div className="info">
        <Link to={"/contact/" + contactId}>
          <span className="name">{contactName}</span>
        </Link>
        <Link to={"/contact/" + contactId}>
          <span className="phone">{contactNumber}</span>
        </Link>
      </div>
    </div>  
  )
}

export default ContactItem