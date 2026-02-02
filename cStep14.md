1. Error Boundaries
we already used this. 

Your ErrorBoundary catches:

✔ render errors
✔ lifecycle errors
✔ constructor errors

Example:
throw new Error("Boom");
inside render → boundary shows fallback UI.

It does NOT catch:

❌ event handler errors
❌ async errors (fetch, promises)
❌ setTimeout errors
❌ API failures

Example — NOT caught:

onClick={() => {
  throw new Error("Click error");
}}

Why?
Because event handlers run outside render phase.


2. Test: 

Add this line temporarily inside Dashboard render area:
{JSON.parse("bad json")}

Result:
ErrorBoundary fallback UI appears

Remove after test.


Note: Error Boundaries catch render-time errors, not async or event handler errors.

3. Testing Intro — Jest

Jest is a JavaScript testing framework used to test React logic and functions.

Used for:

unit tests
function tests
component behavior tests


4. Start with:
pure functions

src/pages/slowCalculation.test.ts

create slowCalculation.test.ts

type nul > src\pages\slowCalculation.test.ts

```

import { slowCalculation } from "./Dashboard";

test("slowCalculation multiplies correctly", () => {
  expect(slowCalculation(2)).toBe(2000);
});

```

5. Dashboard: 

From: 
function slowCalculation(num: number) {

To: 
export function slowCalculation(num: number) {


6. 

install jest
npm install -D jest ts-jest @types/jest

update package.json

"test": "jest"


initialize jest config

npx ts-jest config:init

This create jest.config.js

Then find this in the file: 
From: 
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};


To: 

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};



Install

npm install -D jest ts-jest @types/jest typescript jest-environment-jsdom


Create tsconfig.json (Required) in root

type nul > tsconfig.json

```

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}


```


Delete old jest.config.js if exists.

Then, run: 

npx ts-jest config:init


Replace with 

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["**/*.test.(ts|tsx|js)"]
};


npm test: Error:


Try installing 

npm install -D util


create src/jest.setup.ts

type nul > src\jest.setup.ts

```

import { TextEncoder, TextDecoder } from "util";

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;


```


Open jest.config.js

Add this line: 

setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],


7. NOw, test; 

It will work. 

Optional, if it not 1000, it will show error. 


8. Test Coverage
Coverage shows how much of your code is executed by tests.

It answers:

which lines ran
which functions ran
which files tested

9. Run:

npm test -- --coverage

What You Will See
Jest generates:

coverage/
 ├─ index.html


Terminal shows:
Statements %
Branches %
Functions %
Lines %

10. Step 2 — Open Visual Report

Open:
coverage/index.html

coverage exist, but no index.html in it. 

update jest.config.js

coverageReporters: ["text", "html"],

```
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js"],
  testMatch: ["**/*.test.(ts|tsx|js)"],
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
  coverageReporters: ["text", "html"]
};

```

Run again: 

npm test -- --coverage

It will generate coverage/index.html

Open index.html


11. Redux - saga

Redux-Saga handles async side-effects (API calls, delays, background tasks) using generator functions.

Redux reducers must be pure — Saga handles the side effects outside reducers.


install; 

npm install redux react-redux redux-saga

create src/store/

mkdir src\store

create src/store/newsReducer.ts

type nul > src\store\newsReducer.ts

```

const initialState = {
  news: [],
  loading: false,
};

export default function newsReducer(state = initialState, action: any) {
  switch (action.type) {
    case "NEWS_REQUEST":
      return { ...state, loading: true };

    case "NEWS_SUCCESS":
      return { news: action.payload, loading: false };

    default:
      return state;
  }
}


```

create src/store/newsSaga.ts

type nul > src\store\newsSaga.ts   

```

import { call, put, takeEvery } from "redux-saga/effects";

function fakeApi() {
  return Promise.resolve([
    { id: 1, title: "Saga News A" },
    { id: 2, title: "Saga News B" },
  ]);
}

function* fetchNewsSaga(): any {
  const data = yield call(fakeApi);
  yield put({ type: "NEWS_SUCCESS", payload: data });
}

export function* newsWatcher() {
  yield takeEvery("NEWS_REQUEST", fetchNewsSaga);
}


```

src/store/store.ts

type nul > src\store\store.ts   

```

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import newsReducer from "./newsReducer";
import { newsWatcher } from "./newsSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  newsReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(newsWatcher);


```


update index.ts

import { Provider } from "react-redux";
import { store } from "./store/store";

-----

<Provider store={store}>
  <AuthProvider>
    <App />
  </AuthProvider>
</Provider>


update news.

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

------

inside component: 

const dispatch = useDispatch();
const { news, loading } = useSelector((s: any) => s);

useEffect(() => {
  dispatch({ type: "NEWS_REQUEST" });
}, []);



inside render: 


{loading && <p>Loading via Saga...</p>}

<ul>
  {news.map((n: any) => (
    <li key={n.id}>{n.title}</li>
  ))}
</ul>


I do not know what to do next?



12. 
13. 
14. 
15. 
16. 
17. 
18. 
19. 
20. 
21. 
22. 
23. 
24.  
25. 
26. 
27. 
28. 
29. 
30. 
31. 
32. 
33. 
34. 
35. 
36. 
37. 
38. 
39. 
40. 
41. 
42. 
43. 
44. 
45. 
46. 
47. 
48. 
49. 
50.  
51. 
52. 
53. 
54. 
55. 
56. 
57. 
58. 
59. 
60. 


