import { io } from 'socket.io-client';

const URL = 'http://44.196.0.230:3001'; 

export const socket = io(URL, {
    autoConnect: false    
});
