import { useContext, useState, useEffect, useMemo } from 'react';
import AuthContext from '../context/AuthContext';
import { fetchMe } from "../api/authApi";


function slowCalculation(num: number) {
  console.log('Running slow calculation...');
  let result = 0;
  for (let i = 0; i < 1_000_000_000; i++) {
    result += num;
  }
  return result;
}

function Dashboard() {

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
      <br />

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here"
      />

       </div>

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

export default Dashboard;
