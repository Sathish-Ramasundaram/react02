import { useContext, useState, useMemo } from "react";
import AuthContext from "../context/AuthContext";

function slowCalculation(num: number) {
  console.log("Running slow calculation...");
  let result = 0;
  for (let i = 0; i < 1_000_000_000; i++) {
    result += num;
  }
  return result;
}

function Dashboard() {

    const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const calculatedValue = useMemo(() => {
  return slowCalculation(count);
}, [count]);


  const isAuthenticated = useContext(AuthContext)

  return (
    <div>
      <header>

      
      <h1>Auth Status: </h1>
      <p>{isAuthenticated ? "Logged In" : "Logged Out"}</p>

    
    <h1 className="text-2xl font-bold text-blue-600">
      Dashboard
    </h1>
    </header>
    <p>Calculated value: {calculatedValue}</p>

      <button onClick={() => setCount(count + 1)}>
        Increment Count
      </button>

      <br /><br />

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type here"
      />


    </div>
  );
}

export default Dashboard;
