import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from './stores/index'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

// test
 <Provider store = {store}>
<App />
</Provider>

);

