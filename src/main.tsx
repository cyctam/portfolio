import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { CONTENT } from "./data/content";
import { reportMissing } from "./lib/site";
import "./styles/style.css";

const root = document.getElementById("root");
if (!root) throw new Error('Missing <div id="root"> in index.html');

reportMissing(CONTENT);

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
