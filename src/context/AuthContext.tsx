import { createContext, ReactNode } from "react";

const AuthContext = createContext(null);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={null}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };

export default AuthContext;
