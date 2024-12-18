import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.jsx";
// import { stores } from "./Redux/Stores.jsx";

// Get the root element
const rootElement = document.getElementById("root");

// Create root using React 18 API
const root = createRoot(rootElement);

// Render the app wrapped in StrictMode and BrowserRouter
root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
