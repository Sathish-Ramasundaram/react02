import { createContext, ReactNode } from "react";

const AuthContext = createContext(false);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={false}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };

export default AuthContext;