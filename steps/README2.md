

- **A2** Paste code inside `public/index.html`  

 ```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>SR Stores</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>

```
- **A3** Paste code inside `src/index.tsx`  

import { createRoot } from "react-dom/client";

const container = document.getElementById("root"); 

if (!container) { // !container means container === null OR container === undefined OR any “falsy” value
  throw new Error("Root element not found");
}

const root = createRoot(container);
root.render(
    <div>Test from index.tsx</div>
);

---
createRoot is a function provided by React DOM (specifically React 18+) that creates a root for your React app.

container can be:
an actual DOM element (<div id="root">)
or null (if it doesn’t exist)
So its type is:
HTMLElement | null


- **A4** Production build  
npm run build   

We see
dist/
 ├── bundle.js
 └── index.html

Shift + Alt + F ---> Align the code

- **A5** Start development server  
npm run dev
- development server is starting (20)
Open:
http://localhost:3000
You see
Test from index.tsx

- **A6** Create `App.tsx` inside `src` 
type nul > src\App.tsx

```
function App() {
  return (
    <div>
      Hello from App.tsx
    </div>
  );
}

export default App;
```

- **A7** Update `index.tsx` to render `App`  
```
import App from "./App";

root.render(
    <App />
```

- **A8** Stop the current process  
ctrl + c

- **A9** Run development server again  
npm run dev

What we see
Hello from App.tsx

---

if you want to render App twice in the same page. 
use: 
root.render(
  <>
    <App />
    <App />
  </>
);

✔ Valid JSX
✔ No extra DOM node

or 

root.render(
  <div>
    <App />
    <App />
  </div>
);

✔ Works
❌ Adds an extra <div> to the DOM

---

- **A10** Install `react-router-dom`  
npm install react-router-dom

- **A11** Install Tailwind dependencies  
npm install -D tailwindcss postcss autoprefixer

- **A12** Create `tailwind.config.js` file  
type nul > tailwind.config.js









