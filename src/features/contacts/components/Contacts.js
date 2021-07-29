import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { setContacts } from '../../../redux/reducers/contacts-reducer'
import contentHeightHelper from '../../../helpers/content-height-helper'

import PageHeading from '../../page-heading/components/PageHeading'
import ContactItem from './ContactItem'
import PageLoader from '../../loader/components/PageLoader'

import '../styles/Contacts.css'

const Contacts = () => {
  const contacts = useSelector(state => state.contacts.contacts)
  const userId = useSelector(state => state.user.userId)
  const userAuthToken = useSelector(state => state.user.userAuthToken)
  const [pageLoaded, setPageLoaded] = useState(false)
  const dispatch = useDispatch()

  const fetchUserContacts = async () => {
    axios.post('api/getall', {
      getAll: true,
      token: userAuthToken,
      userId: userId
      })
      .then(response => {
        if(response.data.contacts) {
          dispatch(setContacts(response.data.contacts)) 
        }          
      }  
    )
  }

  useEffect(() => {
    contentHeightHelper()

    setTimeout(() => {
      setPageLoaded(true)
    }, 200)

    fetchUserContacts()
  }, [])

  const checkForContacts = () => {
    if(contacts.length === 0 || !contacts) {
      return(
        <div className="no-contacts">
          You don't have any contacts yet...
        </div>
      )
    } else {
      return contacts.map((contact, i) => {
        return(<ContactItem key={i} contactId={contact.id} contactName={contact.contactName} contactNumber={contact.contactNumber} contactPicture={contact.contactPicture} />)
      })
    }
  }

  return(
    <main>
      <PageHeading
        name = "Contacts"
        linkTo = "/add-contact"
        linkText = "+ Add Contact"
        search = {true}
      />
      <div className="contact-list">
        {pageLoaded ? checkForContacts() : <PageLoader />}     
      </div>
    </main>
  )
}

export default Contacts