import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import { lazy, Suspense } from 'react';
import News from './pages/News';
import ProtectedRoute from './routes/ProtectedRoute';
import NotFound from './pages/NotFound';

function App() {
  const Dashboard = lazy(() => import('./pages/Dashboard'));

  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/dashboard"
            element={
                      <ProtectedRoute>
                      <Suspense fallback={<p>Loading Dashboard...</p>}>
                  <Dashboard />
                </Suspense>

                </ProtectedRoute>

         
    
   
              
            }
          />

          <Route path="/news" element={<News />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
