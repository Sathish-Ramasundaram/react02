npm run build   
- production build. (16)
We see
dist/
 ├── bundle.js
 └── index.html

 - paste this code inside public/index.html: (17)

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
- paste this code inside src/index.tsx (18)

import { createRoot } from "react-dom/client";

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
    <div>Test from index.tsx</div>
);

---

npm run build 
- (19)

npm run dev
- development server is starting (20)
Open:
http://localhost:3000
You see
Test from index.tsx

- create a new file App.tsx inside src and paste the below command (21)
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

- update these 2 lines index.tsx (22)
```
import App from "./App";

root.render(
    <App />
```

- ctrl + c
stops the current process. (24)

npm run dev
- run the project / development server is running (25)
What we see
Hello from App.tsx

npm install react-router-dom
- to install react-router-dom (26)

npm install -D tailwindcss postcss autoprefixer
- Tailwind dependencies (27)

type nul > tailwind.config.js
- this create the file (28)









