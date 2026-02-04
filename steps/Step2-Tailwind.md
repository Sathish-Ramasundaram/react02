# Tailwind:

1.

npm install -D tailwindcss@3.4.17 postcss autoprefixer
npm install -D @tailwindcss/postcss

Install CSS loader dependencies
npm install -D style-loader css-loader postcss-loader

or
Merged command:

npm install -D tailwindcss@3.4.17 postcss autoprefixer @tailwindcss/postcss style-loader css-loader postcss-loader

2.  type nul > tailwind.config.js

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

3.  type nul > postcss.config.js

```

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

```

4.  type nul > src/index.css

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

@tailwind utilities;
This loads all utility classes — the core of Tailwind.
Example:
flex
p-4
text-center
bg-red-500
mt-2
grid
w-full
This is what you mostly use in JSX:

<div class="flex p-4 bg-blue-500 text-white">

6.  Update `index.tsx` to import CSS  
    ``

import "./index.css";

``

7.  Update `rspack.config.js` rules

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
        If Tailwind is working, you will see this text in the center. background gray. Bold font. Text in blue
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
flex-direction: row; /_ default _/
Main axis → horizontal (left → right)
Cross axis → vertical (top → bottom)
If you change flex-direction, the axes switch.
They work only if the parent has: display: flex;

text-2xl font-bold text-blue-600
font-size: 1.5rem; / Makes text large
font-weight: 700; / Makes text bold
color: #2563eb;
