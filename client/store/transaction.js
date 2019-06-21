import axios from 'axios'

/* -----------------    ACTION TYPES    ------------------ */

const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

/* ------------     ACTION CREATORS      ------------------ */

const init = transaction => ({type: GET_TRANSACTIONS, transaction})

/* ------------          REDUCER         ------------------ */

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return action.transaction
    default:
      return state
  }
}

/* ------------       THUNK CREATORS     ------------------ */

// export const fetchTranscations = () => async dispatch => {
//   try {
//     await axios.get('/api/transcation').then(res => dispatch(init(res.data)))
//   } catch (err) {
//     console.error(err)
//   }
// }
export function fetchTranscations() {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/transaction')
      dispatch(init(data))
    } catch (err) {
      console.log('error in fetchTranscations thunk')
    }
  }
}
