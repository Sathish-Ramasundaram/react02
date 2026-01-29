import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

const container = document.getElementById("root"); 
// container can be:
// an actual DOM element (<div id="root">)
// or null (if it doesn’t exist)
// So its type is:
// HTMLElement | null

if (!container) { // !container means container === null OR container === undefined OR any “falsy” value
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);