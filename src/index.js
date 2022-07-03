import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import DataLayer from './appState/StateProvider';
import reducer, { initialState } from './appState/reducer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <DataLayer reducer={reducer} initialState={initialState} >
        <App />
      </DataLayer>
  </React.StrictMode>
);

