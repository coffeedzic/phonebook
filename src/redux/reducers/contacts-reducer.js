export const setSearch = search => ({
  type: 'CONTACTS.SET_SEARCH',
  payload: search
})

export const setContacts = contactsArray => ({
  type: 'CONTACTS.SET_CONTACTS',
  payload: contactsArray
})

const initialState = {
  contacts: Array(0).fill(null),
  search: ''
}

const contactsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'CONTACTS.SET_SEARCH':
      return {
        ...state,
        search: action.payload
      }
    case 'CONTACTS.SET_CONTACTS':
      return {
        ...state,
        contacts: action.payload
      }
    default:
      return state
  }
}

export default contactsReducer