import React from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client';

/* Import App component */
import { App } from './app.jsx';

const socket = io('ws://localhost:8080',{transports:['websocket']});

socket.on('words', function (data) {
    render(<App data={data} />, document.getElementById('app'));
});