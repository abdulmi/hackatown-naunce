import React from 'react';
import { render } from 'react-dom';
import App from './components/app';

render(<App url="http://localhost:3050/api/items"/>,document.getElementById('app'))

// socket.on("refresh", function(msg){
//   render(<App url="http://localhost:3050/api/items"/>,document.getElementById('app'))
// })
