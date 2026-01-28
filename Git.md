git init

create .gitignore

# dependencies
node_modules/

# production build
dist/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# env files
.env

---


initial git repository configuration

git add .
git commit -m "first commit"
git branch -M main
-- from git repo websites (similar like git remote add origin https://github.com/Sathish-Ramasundaram/react02.git)
git push -u origin main

---

npm install -D gh-pages

Add home page in package.json (between version and description)

  "homepage": "https://Sathish-Ramasundaram.github.io/repo-name",

replace scripts

"scripts": {
  "dev": "rspack serve",
  "build": "rspack build",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
},

update this in rspack.config.js
const isProd = process.env.NODE_ENV === "production";

update:

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: isProd ? "/react02/" : "/",

react02 must match git repo name

--


git add . 

git commit -m "updated"

git push

  npm run build

  index.html should be in dist

  npm run deploy  // change the setting 

setting -> pages -> branch -> gh-page (root) => verify this

--- page is blank. It is working in local server

in App.tsx
From: 
<BrowserRouter>
To: 
<BrowserRouter basename="/react02">
