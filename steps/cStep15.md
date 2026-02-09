1.  Tiny Goal:
    Just understand: Button click → Redux action happens

src/redux/news/newsActions.ts

From:
export const fetchNewsRequest = () => ({
type: FETCH_NEWS_REQUEST,
});

To:
export const fetchNewsRequest = () => {
console.log("STEP1: Action creator called");

return {
type: FETCH_NEWS_REQUEST,
};
};

2. Test:
   Open browser console (F12).
   Click:
   Fetch News (Redux Saga)

You should see:
STEP1: Action creator called

You Just Learned
👉 Button click → Redux action creator runs

3. Tiny Goal:
   See When Saga Wakes Up
   Right now you saw:
   Button → Action creator runs

Now we will see:
Action → Saga hears it

4. open src/redux/news/newsSaga.ts

From:
export function\* newsSaga() {
yield takeLatest(FETCH_NEWS_REQUEST, fetchNewsWorker);
}

To:
export function\* newsSaga() {
console.log("STEP2: Saga watcher started");

yield takeLatest(FETCH_NEWS_REQUEST, fetchNewsWorker);
}

5. Stop server if running:
   Ctrl + C

Start again:
npm run dev

Open any page once (reload is enough).
What You Should See in Console (Without Clicking)
STEP2: Saga watcher started

What This Means (one line)
👉 Redux-Saga is connected and running in background.
It is now listening for actions.
Just ears are open

6. Redux-Saga = a background worker system for Redux
   It listens for Redux actions and runs async work like:

API calls
delays
retries
complex flows
background tasks

Your component does NOT do the async work.
Saga does it outside the UI.

Think:

UI = button click
Saga = backend staff
Redux = storage room

7. What Does “Async” Mean? (No jargon)
   Async means:
   Something that takes time, and we don’t want the app to freeze while waiting.

Simple Real-Life Example

Normal (sync):
Cook noodles → wait → eat → next work
You cannot do anything while cooking.

Async:
Order food → continue working → food arrives → eat
You didn’t stop your work.

8. Why Name “takeLatest”
   Because if user clicks button many times:

click click click click

Saga keeps only the latest one
Older ones are cancelled.

Good for:
API fetch
search
refresh button

9. update newsSaga.ts
   from:
   function\* fetchNewsWorker(): any {

To:
function\* fetchNewsWorker(): any {
console.log("STEP3: Saga worker started"); 10. Test:
On load:
STEP2: Saga watcher started
On click:
STEP1: Action creator called
STEP3: Saga worker started

11. Flow:
    Page load → saga watcher started
    Button click → action creator runs
    Button click → saga worker runs

12. update src/redux/news/newsSaga.ts

From:
const data = yield call(fetchNewsApi);

To:
console.log("STEP4: Before API call");

const data = yield call(fetchNewsApi);

console.log("STEP5: After API call", data);

13. Expected output: after button click

STEP1: Action creator called
STEP3: Saga worker started
STEP4: Before API call
(wait ~1.5 sec)
STEP5: After API call [array data]

14. yield call(fetchNewsApi)
    means:

“Run async API — and PAUSE saga here until result comes back”
Exactly like you learned:

await fetchNewsApi()
But saga uses:
yield call(...)

15. From async mini lesson:
    await → pause async function

From saga:
yield → pause generator saga

Same idea — different tool.

16. newsSaga

From:
yield put(fetchNewsSuccess(data));

To:
console.log("STEP6: Saga dispatching SUCCESS action");

yield put(fetchNewsSuccess(data));

17. Expected output after button click:

STEP1: Action creator called
STEP3: Saga worker started
STEP4: Before API call
(wait)
STEP5: After API call [...]
STEP6: Saga dispatching SUCCESS action

18. yield put(...)
    means:
    “Saga sends a Redux action”

Same as:
dispatch(...)
But from inside saga.

19. You have seen:
    click button
    → action created
    → saga wakes
    → saga calls API
    → saga waits
    → saga gets result
    → saga dispatches success

20. src/redux/news/newsReducer.ts

To:

export default function newsReducer(
state = initialState,
action: any
): NewsState {

console.log("STEP7: Reducer received:", action.type);

switch (action.type) {

21. Expected output:

STEP2: Saga watcher started (app load)

STEP1: Action creator called (button click)
STEP7: Reducer received: FETCH_NEWS_REQUEST

STEP3: Saga worker started
STEP4: Before API call
STEP5: After API call [...]

STEP6: Saga dispatching SUCCESS action
STEP7: Reducer received: FETCH_NEWS_SUCCESS

22. Note:
    STEP7: Reducer received: @@redux/INIT9.b.3.h.y.9
    STEP7: Reducer received: @@redux/PROBE_UNKNOWN_ACTIONz.l.3.v.i.l
    STEP7: Reducer received: @@redux/INIT9.b.3.h.y.9
    STEP2: Saga watcher started

I received this before click the button.

why? Redux automatically sends internal setup actions when the app starts.

Reducer is the state machine of Redux.
Redux must run reducer once at startup to create:
initialState
So Redux sends a hidden INIT action.
Reducer runs → returns initial state.

Simple Analogy
When a shop opens in the morning:
manager checks inventory first
Before customers come.

Same here:
Redux checks reducer first
Before your button clicks.

These Are NOT Your Actions

Your real actions are:
FETCH_NEWS_REQUEST
FETCH_NEWS_SUCCESS

23. Tiny Goal:
    Goal:
    See when loading becomes true → UI shows “Loading…”

24. src/redux/news/newsReducer.ts

To:
case FETCH_NEWS_REQUEST:
console.log("STEP8: Reducer sets loading = true");
return { ...state, loading: true, error: null };

Also:

case FETCH_NEWS_SUCCESS:
console.log("STEP9: Reducer sets loading = false and stores data");
return { loading: false, data: action.payload, error: null };

25. Step A — Watch UI first

Click button once.

You should SEE:

Loading...

appear briefly.

Step B — Watch console

You should see:

STEP1: Action creator called
STEP7: Reducer received: FETCH_NEWS_REQUEST
STEP8: Reducer sets loading = true
STEP3: Saga worker started
STEP4: Before API call
STEP5: After API call (3) ['React 19 Released', 'Redux Toolkit Trending', 'TypeScript 6 Preview']
STEP6: Saga dispatching SUCCESS action
STEP7: Reducer received: FETCH_NEWS_SUCCESS
STEP9: Reducer sets loading = false and stores dat

26. FLow:
    Click button
    ↓
    Action creator runs
    ↓
    Reducer sets loading true
    ↓
    Saga worker starts
    ↓
    Saga calls API (pause)
    ↓
    API returns
    ↓
    Saga dispatches success
    ↓
    Reducer stores data
    ↓
    UI updates


27.Goal:
Visually understand what takeLatest really does.

newApi.ts
await new Promise((r) => setTimeout(r, 5000));


28. Test: 
Click button 3 times quickly
click
click
click

within 1 second.

you will see:

WORKER STARTED
WORKER STARTED
WORKER STARTED

BUT…
Only ONE success result appears after 5 sec.

29. What Just Happened (Plain Words)
Because you used:
takeLatest(FETCH_NEWS_REQUEST, worker)

takeLatest =
“Only keep the most recent request — cancel older ones”

Used for:
search typing
refresh button
filter changes
reload data


30. Tiny Change — Switch to takeEvery

change import line to: 

import { call, put, takeEvery } from "redux-saga/effects";

change watcher to: 
yield takeEvery(FETCH_NEWS_REQUEST, fetchNewsWorker);


Make sure your API delay is still 5 seconds:

Restart server
Ctrl + C
npm run dev

31. Test: Click 3 times quickly. 

What You Will See Now (takeEvery)

Console:
WORKER STARTED
WORKER STARTED
WORKER STARTED


After ~5 seconds:
SUCCESS
SUCCESS
SUCCESS

You will see multiple completions.

32. takeEvery - click click click
 → run all
 → no cancel
 → 3 results

33. takeEvery — background jobs

Use for:
logging
analytics
audit trails
notifications
fire-and-forget tasks

34. throttle
throttle = “Allow at most 1 action in X milliseconds”

35. Replace with: 

import { call, put, throttle } from "redux-saga/effects";


From: 
yield takeEvery(FETCH_NEWS_REQUEST, fetchNewsWorker);

To: 
yield throttle(3000, FETCH_NEWS_REQUEST, fetchNewsWorker);

Keep API Delay Short (Optional)
To keep demo clean, change API delay back to 2 seconds:

36. Throttle allows the first action — then ignores the rest — until the time window ends.
yield throttle(3000, FETCH_NEWS_REQUEST, fetchNewsWorker);

It means:
Allow only one worker run every 3 seconds

Test: 
Visual 
0s   click → allowed
1s   click → blocked
2s   click → blocked
3s   click → allowed


Throttle does not queue blocked clicks.
They are simply ignored.

37. Race: 
race = run two async tasks → whichever finishes first wins
API call vs timeout

We will make saga do:
API call  vs  2-second timeout

If API is slow → timeout wins → show error
If API is fast → API wins → show data
You will SEE it in console + UI.

38. newsApi.ts
Set delay to 5 seconds:

newsSaga.ts
Add race + delay

import { call, put, race, delay, throttle } from "redux-saga/effects";


Find this inside worker: 
const data = yield call(fetchNewsApi);

Replace with: 

console.log("RACE: starting API vs timeout");

const { data, timeout } = yield race({
  data: call(fetchNewsApi),
  timeout: delay(2000),
});

if (timeout) {
  console.log("RACE: timeout won");
  yield put(fetchNewsFailure("Request timed out"));
  return;
}

console.log("RACE: API won");



39. Test: 
Console:
RACE: starting API vs timeout
RACE: timeout won


UI:
Request timed out

40. Select

select = saga reads data directly from Redux store
useSelector → in React component
select → in saga

Goal of This Demo
Before saga calls API, we will:
👉 read current news count from Redux store
👉 print it in console

41. update: 
To: 
import { call, put, race, delay, throttle, select } from "redux-saga/effects";


Inside your worker — at the TOP of try block — add this:
const currentNews = yield select((state: any) => state.news.data);
console.log("SELECT: news already in store =", currentNews.length);

it comes: 
function* fetchNewsWorker(): any {

  try {

    const currentNews = yield select((state: any) => state.news.data);
    console.log("SELECT: news already in store =", currentNews.length);

    console.log("RACE: starting API vs timeout");

    const { data, timeout } = yield race({

42. update newApi to 1sec

now test: 

First click
Console:
SELECT: news already in store = 0
(because store empty)

Second click (after success loaded)
Console:
SELECT: news already in store = 3

(because reducer stored news)


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
