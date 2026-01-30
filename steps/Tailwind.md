# Tailwind:

1. 
npm install -D tailwindcss@3.4.17 postcss autoprefixer
npm install -D @tailwindcss/postcss

2. 
type nul > tailwind.config.js

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

3. 
type nul > postcss.config.js
 
```

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

4. 
type nul > src/index.css

- **B7** Paste Tailwind directives into `index.css`  
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
global entry point for all styles 

5. 
Install CSS loader dependencies
npm install -D style-loader css-loader postcss-loader

6. 
Update `index.tsx` to import CSS  
``

import "./index.css";

``

7. 
Update `rspack.config.js` rules  

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

8. 

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
