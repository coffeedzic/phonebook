import { combineReducers } from "redux";

import userReducer from './reducers/user-reducer'
import loadingReducer from './reducers/loading-reducer'
import modalReducer from './reducers/modal-reducer'
import contactsReducer from "./reducers/contacts-reducer";


const rootReducer = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  modal: modalReducer,
  contacts: contactsReducer
})

export default rootReducer