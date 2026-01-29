- **B1.1** Downgrade to Tailwind v3 (stable)  
npm uninstall tailwindcss @tailwindcss/postcss
npm install -D tailwindcss@3.4.17 postcss autoprefixer

- **B1.2** Install Tailwind PostCSS plugin  
npm install -D @tailwindcss/postcss

- **B2** Open and paste code  
- **B3** Ensure `tailwind.config.js` is correct  
```
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```


- **B4** Create `postcss.config.js` file  
type nul > postcss.config.js

- **B5** Paste code into `postcss.config.js`  
```
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- **B6** Create `src/index.css` file  
type nul > src/index.css

- **B7** Paste Tailwind directives into `index.css`  
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
global entry point for all styles 

Injects base styles + CSS reset 
Injects pre-built component styles 
Injects utility classes 

base → components → utilities
Utilities must override base & component styles

- **B8** Update `index.tsx` to import CSS  
import "./index.css";

- **B9** Install CSS loader dependencies  
npm install -D style-loader css-loader postcss-loader

- **B10** Update `rspack.config.js` rules  
existing module: rules propably look like this
```
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
```

update / Add css rule
```
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
    {
  test: /\.css$/,
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        importLoaders: 1,
      },
    },
    "postcss-loader",
  ],
},
  ],
},
```

- **B12** Update `App.tsx` temporarily to test Tailwind

```
function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-blue-600">
        Tailwind is working 🚀
      </h1>
    </div>
  );
}

export default App;
```
min-h-screen flex items-center justify-center bg-gray-100
min-height: 100vh;
display: flex;
align-items: center;
justify-content: center;
background-color: #f3f4f6;

align-items vs justify-content:

        ↑  align-items
        |
← justify-content → 
        |
        ↓

justify-content aligns items along the main axis,
align-items aligns items along the cross axis.

display: flex;
flex-direction: row; /* default */
Main axis → horizontal (left → right)
Cross axis → vertical (top → bottom)
If you change flex-direction, the axes switch.
They work only if the parent has: display: flex;

text-2xl font-bold text-blue-600
font-size: 1.5rem; / Makes text large
font-weight: 700; / Makes text bold
color: #2563eb;

