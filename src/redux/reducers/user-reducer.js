import token from '../../helpers/tokenhelper.js'

export const setUserAuthToken = token => (
  {
    type: 'USER.SET_USER_AUTH_TOKEN',
    payload: token
  }
)

export const setUserId = id => ({
  type: 'USER.SET_USER_ID',
  payload: id
})

export const setUserName = name => ({
  type: 'USER.SET_USER_FULLNAME',
  payload: name
})

export const setUserEmail = email => ({
  type: 'USER.SET_USER_EMAIL',
  payload: email
})

export const setLoggedIn = () => ({
  type: 'USER.SET_LOGGED_IN'
})

export const unsetLoggedIn = () => ({
  type: 'USER.UNSET_LOGGED_IN'
})

const initialState = {
  userAuthToken: token.get('userAuthToken') ? token.get('userAuthToken') : '',
  userId: '',
  userName: '',
  userEmail: '',
  loggedIn: false
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'USER.SET_USER_AUTH_TOKEN':
      return {
        ...state,
        userAuthToken: action.payload
      }
    case 'USER.SET_USER_ID':
      return {
        ...state,
        userId: action.payload
      }
    case 'USER.SET_USER_FULL_NAME':
      return {
        ...state,
        userName: action.payload
      }
    case 'USER.SET_USER_EMAIL':
      return {
        ...state,
        userEmail: action.payload
      }
    case 'USER.SET_LOGGED_IN':
      return {
        ...state,
        loggedIn: true
      }
    case 'USER.UNSET_LOGGED_IN':
      return {
        ...state,
        loggedIn: false
      }
    default:
      return state
  }
}

export default userReducer