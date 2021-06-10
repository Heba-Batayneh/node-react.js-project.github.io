import React from 'react';
import ReactDOM from 'react-dom';
// حتى يتم تنسيق التطبيق بشكل تلقائي 
import 'milligram/dist/milligram.min.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
