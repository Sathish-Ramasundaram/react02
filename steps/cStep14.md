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

install jest --------
npm install -D jest ts-jest @types/jest

update package.json ------
"test": "jest"

Install ------------------------
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

initialize jest config ------------------

npx ts-jest config:init

Replace with

module.exports = {
preset: "ts-jest",
testEnvironment: "jsdom",
moduleFileExtensions: ["ts", "tsx", "js"],
testMatch: ["**/*.test.(ts|tsx|js)"]
};

npm test: Error:

Try installing --------------------
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

typescript types:
npm install -D @types/react-redux

12. 
mkdir src\redux
mkdir src\redux\news

create News Types
src/redux/news/newsTypes.ts

type nul > src\redux\news\newsTypes.ts

```

export const FETCH_NEWS_REQUEST = "FETCH_NEWS_REQUEST";
export const FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS";
export const FETCH_NEWS_FAILURE = "FETCH_NEWS_FAILURE";

```

13. create src/redux/news/newsActions.ts

type nul > src\redux\news\newsActions.ts

```

import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
} from "./newsTypes";

export const fetchNewsRequest = () => ({
  type: FETCH_NEWS_REQUEST,
});

export const fetchNewsSuccess = (data: string[]) => ({
  type: FETCH_NEWS_SUCCESS,
  payload: data,
});

export const fetchNewsFailure = (error: string) => ({
  type: FETCH_NEWS_FAILURE,
  payload: error,
});


```


14. create src/redux/news/newsReducer.ts
type nul > src\redux\news\newsReducer.ts

```

import {
  FETCH_NEWS_REQUEST,
  FETCH_NEWS_SUCCESS,
  FETCH_NEWS_FAILURE,
} from "./newsTypes";

type NewsState = {
  loading: boolean;
  data: string[];
  error: string | null;
};

const initialState: NewsState = {
  loading: false,
  data: [],
  error: null,
};

export default function newsReducer(
  state = initialState,
  action: any
): NewsState {
  switch (action.type) {
    case FETCH_NEWS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_NEWS_SUCCESS:
      return { loading: false, data: action.payload, error: null };

    case FETCH_NEWS_FAILURE:
      return { loading: false, data: [], error: action.payload };

    default:
      return state;
  }
}


```

15. Create Fake News API
src/api/newsApi.ts

type nul > src\api\newsApi.ts     

```

export async function fetchNewsApi() {
  await new Promise((r) => setTimeout(r, 1500));

  return [
    "React 19 Released",
    "Redux Toolkit Trending",
    "TypeScript 6 Preview",
  ];
}


```

16. create src/redux/news/newsSaga.ts

type nul > src\redux\news\newsSaga.ts   

```

import { call, put, takeLatest } from "redux-saga/effects";
import { fetchNewsApi } from "../../api/newsApi";
import {
  fetchNewsSuccess,
  fetchNewsFailure,
} from "./newsActions";
import { FETCH_NEWS_REQUEST } from "./newsTypes";

function* fetchNewsWorker(): any {
  try {
    const data = yield call(fetchNewsApi);
    yield put(fetchNewsSuccess(data));
  } catch (err: any) {
    yield put(fetchNewsFailure(err.message));
  }
}

export function* newsSaga() {
  yield takeLatest(FETCH_NEWS_REQUEST, fetchNewsWorker);
}



```


17. 👉 Redux-Saga Concepts used:
call → call async function
put → dispatch action
takeLatest → only latest request runs


18. src/redux/rootSaga.ts

type nul > src\redux\rootSaga.ts    

```

import { all } from "redux-saga/effects";
import { newsSaga } from "./news/newsSaga";

export default function* rootSaga() {
  yield all([
    newsSaga(),
  ]);
}


```
19. create src/redux/rootReducer.ts

type nul > src\redux\rootReducer.ts

```

import { combineReducers } from "redux";
import newsReducer from "./news/newsReducer";

const rootReducer = combineReducers({
  news: newsReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;


```
20. src/redux/store.ts

type nul > src\redux\store.ts     

```

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default store;


```
21. update Index.tsx

import { Provider } from "react-redux";
import store from "./redux/store";


Wrap App: 

root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </ErrorBoundary>
);

22. Create new page: 

src/pages/ReduxNewsPage.tsx


type nul > src\pages\ReduxNewsPage.tsx

```

import { useDispatch, useSelector } from "react-redux";
import { fetchNewsRequest } from "../redux/news/newsActions";
import { RootState } from "../redux/rootReducer";

function ReduxNewsPage() {
  const dispatch = useDispatch();

  const { loading, data, error } = useSelector(
    (state: RootState) => state.news
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Redux Saga News Demo Page
      </h1>

      <button
        onClick={() => dispatch(fetchNewsRequest())}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Fetch News (Redux Saga)
      </button>

      {loading && <p className="mt-3">Loading...</p>}

      {error && (
        <p className="mt-3 text-red-600">
          Error: {error}
        </p>
      )}

      <ul className="mt-4 list-disc ml-6">
        {data.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default ReduxNewsPage;

```
23. Add this in App 

import ReduxNewsPage from "./pages/ReduxNewsPage";

-----------

<Route path="/redux-news" element={<ReduxNewsPage />} />

----------

24.  Run: 
npm run dev
http://localhost:3000/redux-news

Click button:

👉 Fetch News (Redux Saga)

Expected:

Loading...
React 19 Released
Redux Toolkit Trending
TypeScript 6 Preview
