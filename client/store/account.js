import axios from 'axios'

/* -----------------    ACTION TYPES    ------------------ */

const GET_ACCOUNT = 'GET_ACCOUNT'

/* ------------     ACTION CREATORS      ------------------ */

const init = account => ({type: GET_ACCOUNT, account})

/* ------------          REDUCER         ------------------ */

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_ACCOUNT:
      return action.account
    default:
      return state
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export function fetchAccounts() {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/account')
      dispatch(init(data))
    } catch (err) {
      console.log('error in fetchAccounts thunk')
    }
  }
}
