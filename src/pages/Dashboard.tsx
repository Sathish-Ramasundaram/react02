import { useContext, useState, useEffect, useMemo, useCallback, useRef } from 'react';
import AuthContext from '../context/AuthContext';
import { fetchMe } from "../api/authApi";
import React from 'react';
import ClassCounter from "../components/ClassCounter";
import withAuthGuard from "../hoc/withAuthGuard";
import { Link } from "react-router-dom";



export function slowCalculation(num: number) {
  console.log('Running slow calculation...');
  let result = 0;
  for (let i = 0; i < 1_000_000_000; i++) {   
    // i < 1_000_000_000;
    result += num;
  }
  return result;
}

const ChildDemo = React.memo(function ChildDemo(
  { onAction }: { onAction: () => void }
) {

  console.log("ChildDemo rendered");

  return (
    <button
      onClick={onAction}
      className="mt-3 bg-purple-600 text-white px-3 py-1 rounded"
    >
      Child Action
    </button>
  );
});




function Dashboard() {




  // normal function (new every render)
const normalHandler = () => {
  setCount(c => c + 1);
};

// memoized function (stable reference)
const memoHandler = useCallback(() => {
  setCount(c => c + 1);
}, []);




  const [loopValue, setLoopValue] = useState(0);


  const [profile, setProfile] = useState<any>(null);

  const [showLoggedOut, setShowLoggedOut] = useState(false);

  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  const calculatedValue = useMemo(() => {
    return slowCalculation(count);
  }, [count]);

  const auth = useContext(AuthContext);

  if (!auth) return null;
  const { isAuthenticated, logout } = auth;


useEffect(() => {
  console.log("Dashboard mounted");
}, []);

useEffect(() => {
  fetchMe()
    .then(data => {
      setProfile(data);
    })
    .catch(err => {
      console.error(err);
    });
}, []);

useEffect(() => {
  console.log("Effect running once");
  setLoopValue(v => v + 1);
}, []);


  const prevCalcRef = useRef<number>(0);


useEffect(() => {
  prevCalcRef.current = calculatedValue;
}, [calculatedValue]);


console.log("AuthContext object:", AuthContext);

  return (
    <div className="w-full min-h-screen relative flex items-center justify-center">



      <div className="bg-white p-6 rounded shadow w-96">

     

      <p>Calculated value: {calculatedValue}</p>

      <button
        onClick={() => setCount(count + 1)}
        className="w-full bg-blue-600 text-white py-2 rounded
    transition
    duration-150
    hover:bg-blue-700
    active:bg-blue-800
    active:scale-95"
      >
        Increment Count
      </button>
      <br />
      <p>Previous calculated value: {prevCalcRef.current}</p>

<br />
      <br />
      <ChildDemo onAction={normalHandler} />
      <br />
<ChildDemo onAction={memoHandler} />



      <br />
      <br />

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here"
      />
      <br />
      <ClassCounter />

       </div>

       <Link
  to="/news"
  className="mt-3 inline-block text-blue-600 underline"
>
  Go to News
</Link>


   <div className="absolute top-4 right-4 text-right">
            {profile && (
  <p className="mt-4">
    Welcome {profile.name} — {profile.role}
  </p>
)}
  <p className="text-sm font-semibold"> Auth Status: 

    {showLoggedOut ? ' Logging Out' : isAuthenticated ? ' Logged In' : ' Logged Out'}
  </p>

  <button
    onClick={() => {
      setShowLoggedOut(true);
      setTimeout(() => logout(), 2000);
    }}
    className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
  >
    Logout
  </button>

</div>

    </div>
  );
}



export default withAuthGuard(Dashboard);

