import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { ContextProvider } from './context/Context';
import store from "./redux/store"
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <Provider store={store}>
  {/* <ContextProvider> */}
    
    <App />
   
  {/* </ContextProvider> */}
  </Provider>
 
);

