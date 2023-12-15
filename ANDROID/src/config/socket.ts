import {io} from 'socket.io-client';

const URL = 'http://10.0.2.2:5005';

const socket = io(URL, {
  autoConnect: false,
});

export default socket;
