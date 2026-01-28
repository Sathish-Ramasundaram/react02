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

  "scripts": {
    "start": "rspack serve",
    "build": "rspack build"
  },

- Update package.json scripts to use "dev" instead of "start"

"scripts": {
  "dev": "rspack serve",
  "build": "rspack build"
}

Not mandatory, but recommended.
Why?
start is conventionally used by CRA
dev is clearer for custom setups
Avoids confusion later when explaining

