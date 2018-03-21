import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import getStore from "./store";

class RootContainer extends React.Component {
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

ReactDOM.render(
  <RootContainer store={getStore()} />,
  document.getElementById("root")
);
registerServiceWorker();
