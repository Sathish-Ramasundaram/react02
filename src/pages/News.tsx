import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import NewsLoader from '../components/NewsLoader';
import withAuthGuard from '../hoc/withAuthGuard';

function News() {
  const auth = useContext(AuthContext);

  if (!auth) return null;
  const { isAuthenticated, logout } = auth;

  useEffect(() => {
    console.log('News sees auth:', isAuthenticated);
  }, [isAuthenticated]);

  console.log('AuthContext object:', AuthContext);



  return (
    <div className="flex min-h-screen">
      <aside className="w-72 p-5">
        <h3 className="text-lg font-semibold mb-4">Recent News</h3>


        <NewsLoader>
          {(news, loading) =>
            loading ? (
              <p className="text-sm text-gray-600">Loading...</p>
            ) : (
              <ul className="space-y-3">
                {news.map((n) => (
                  <li key={n.id}>
                    <a
                      href={n.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-700 hover:underline text-sm"
                    >
                      {n.title}
                    </a>
                  </li>
                ))}
              </ul>
            )
          }
        </NewsLoader>
      </aside>

      <div className="absolute top-4 right-4 text-right">
        <h1>Auth Status:</h1>
        <p>{isAuthenticated ? 'Logged In' : 'Logged Out'}</p>
      </div>
    </div>
  );
}

// export default withAuthGuard(News);

export default News;
