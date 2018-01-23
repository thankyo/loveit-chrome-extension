import styles from "./styles.scss";

import App from "./Router.jsx";
import React from "react";

import { render } from "react-dom";

render(
  <App/>,
  window.document.getElementById("app-container")
);
