- downgrade to tailwind v3 (stable) (48)
npm uninstall tailwindcss @tailwindcss/postcss
npm install -D tailwindcss@3.4.17 postcss autoprefixer

- open and paste this code (29)
- make sure tailwind.config.js looks like below (50)
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

type nul > postcss.config.js
- this create the file (30)

- paste the below code (31)
- replace entire file of postcss.config.js (49)
``
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

type nul > src\index.css
- to open the file (32)

- paste the below case (33)
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
global entry point for all styles 

Injects base styles + CSS reset 
Injects pre-built component styles 
Injects utility classes 

- update index.tsx (34)
import "./index.css";

npm install -D style-loader css-loader postcss-loader
- install css loader (35)

- update rspak.config.js (36)

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

npm install -D @tailwindcss/postcss
- install new tailwind Postcss plugin (37)

- update App.tsx (temporarily) - (38)

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

text-2xl font-bold text-blue-600
font-size: 1.5rem; / Makes text large
font-weight: 700; / Makes text bold
color: #2563eb;

