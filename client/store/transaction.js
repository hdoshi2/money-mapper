import axios from 'axios'

/* -----------------    ACTION TYPES    ------------------ */

const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

/* ------------     ACTION CREATORS      ------------------ */

const init = transaction => ({type: GET_TRANSACTIONS, transaction})

/* ------------          REDUCER         ------------------ */

export default function reducer(stateTranscations = [], action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transaction
    default:
      return stateTranscations
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const fetchTranscations = () => async dispatch => {
  try {
    await axios.get('/api/transcations').then(res => dispatch(init(res.data)))
  } catch (err) {
    console.error(err)
  }
}
