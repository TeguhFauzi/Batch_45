import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from './context/userContext';
import App from "./App";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import 'font-awesome/css/font-awesome.css'

const client = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        
          <App />
    
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>,
);
