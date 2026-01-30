1. Create the project folder
mkdir react02

2. Navigate into the project folder
cd react02

3. Open the folder in VS Code
code .

4. Open the integrated terminal in VS Code 
shift + ctrl + `

5. Initialize a Node.js  project
npm init -y 

6. Install React core libraries
npm install react react-dom  

7. Set up Rspack
npm install -D @rspack/core @rspack/cli @rspack/dev-server @rspack/plugin-react-refresh react-refresh @rspack/plugin-html

Bundler (Rspack) → ready
Dev server → ready
Fast refresh → ready
HTML injection → ready 

8. Install TypeScript and React type definitions
npm install -D typescript @types/react @types/react-dom

9. Create the public folder
mkdir public 

10. Create the src folder
mkdir src

11. Create the `index.html` file inside `public`  
type nul > public\index.html

12. Create the `index.tsx` file inside `src`  
type nul > src\index.tsx

13. Create the Rspack configuration file in the root  
type nul > rspack.config.js

14. Paste code into `rspack.config.js`  

```
const path = require('path');
const HtmlRspackPlugin = require('@rspack/plugin-html').default;

module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                },
              },
            },
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlRspackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    port: 3000,
  },
};

```

15. Update the scripts in `package.json`  

Note: 
"test" → only needed if you actually run tests
Delete "test" for now
Add it back only when you introduce Jest / React Testing Library

  "scripts": {
    "start": "rspack serve",
    "build": "rspack build"
  },

- Update package.json scripts to use "dev" instead of "start"

"scripts": {
  "dev": "rspack serve",
  "build": "rspack build"
},

Not mandatory, but recommended.
Why?
start is conventionally used by CRA
dev is clearer for custom setups
Avoids confusion later when explaining



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








