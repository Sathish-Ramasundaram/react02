import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import NewsLoader from '../components/NewsLoader';
import { useDispatch, useSelector } from "react-redux";


function News() {
  const auth = useContext(AuthContext);

  if (!auth) return null;
  const { isAuthenticated, logout } = auth;

  useEffect(() => {
  console.log("News sees auth:", isAuthenticated);
}, [isAuthenticated]);

console.log("AuthContext object:", AuthContext);

const dispatch = useDispatch();
const { news, loading } = useSelector((s: any) => s);

useEffect(() => {
  dispatch({ type: "NEWS_REQUEST" });
}, []);



  return (
    <div>

      {loading && <p>Loading via Saga...</p>}

<ul>
  {news.map((n: any) => (
    <li key={n.id}>{n.title}</li>
  ))}
</ul>

      <div className="absolute top-4 right-4 text-right">
        <h1>Auth Status:</h1>
        <p>{isAuthenticated ? 'Logged In' : 'Logged Out'}</p>
      </div>

      <NewsLoader>
        {(news, loading) => {
          if (loading) return <p>Loading news...</p>;

          return (
            <ul className="space-y-2">
              {news.map((n) => (
                <li key={n.id} className="font-bold text-red-600 text-lg">
                  {n.title}
                </li>
              ))}
            </ul>
          );
        }}
      </NewsLoader>
    </div>
  );
}

export default News;
