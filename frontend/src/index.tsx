import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WalletConnection from './components/WalletConnection';
import CreateEvents from './components/CreateEvents';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <WalletConnection/>
    <CreateEvents />
  </React.StrictMode>
);
