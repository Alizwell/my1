import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { appConfiguration } from './config/index'
import store from "./redux";

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>,
    document.getElementById("root")
  );
}

appConfiguration.then(() => {
  render();
})

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render)
}
