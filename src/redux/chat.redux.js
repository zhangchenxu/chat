import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:5000');


const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const  MSG_READ = 'MSG_READ';

const initState = {
  chatMsg: [],
  unread: 0
};
export function chat (state=initState,action) {
  switch (action.type) {
    case MSG_LIST:
      return {...state, chatMsg:action.payload, unread: action.payload.filter(v=>!v.read).length};
    // case MSG_READ:
    // case MSG_RECV:
    default:
      return state
  }
}

function msgLists (msgs) {
  return {type: MSG_LIST, payload: msgs}
}
//action
export function getMsgList () {
  return dispatch => {
    axios.get('/user/getmsglist').then(res=> {
      if (res.status === 200 && res.data.code === 1) {
        // success
        dispatch(msgLists(res.data.msgs))
      } else {
      }
    })
  }
}