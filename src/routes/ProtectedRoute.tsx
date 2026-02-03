import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  
  const auth = useContext(AuthContext);

  const DEV_BYPASS = true;

  
  // if (!auth?.isAuthenticated) {
  //   return <Navigate to="/" replace />;
  // }

  if (!DEV_BYPASS && !auth?.isAuthenticated) {
  return <Navigate to="/" replace />;
}


  return children;
}

export default ProtectedRoute;
