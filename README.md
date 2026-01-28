mkdir react02
- to open the project folder (1)

cd react02
- To go inside the project folder (2)

code .
- VS Code is open in a new window (3)

shift + ctrl + `
- shortcut to open the integrated terminal in VS Code. (4)

npm init -y 
- is for initializing a Node.js project. (5)

npm install react react-dom  
- installs the core React libraries. (6)

npm install -D @rspack/core @rspack/cli @rspack/dev-server @rspack/plugin-react-refresh react-refresh @rspack/plugin-html
- Rspack setup  (7)
Bundler (Rspack) → ready
Dev server → ready
Fast refresh → ready
HTML injection → ready 

npm install -D typescript @types/react @types/react-dom
- for TypeScript + React typing layer. (8)

mkdir public 
- to open folder (9)

mkdir src
- to open folder (10)

type nul > public\index.html
- to open file inside public folder (11)

type nul > src\index.tsx
- to open file inside src folder (12)

type nul > rspack.config.js
- to open the file in root (13)

paste the code below inside rspack.config.js (14)

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

Open package.json and update scripts to below one: (15)

  "scripts": {
    "start": "rspack serve",
    "build": "rspack build"
  },

- update package.json script (23)

"scripts": {
  "dev": "rspack serve",
  "build": "rspack build"
}

Not mandatory, but recommended.
Why?
start is conventionally used by CRA
dev is clearer for custom setups
Avoids confusion later when explaining

