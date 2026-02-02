import { createContext, ReactNode, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
  localStorage.getItem("auth") === "true"
);



const login = () => {
  setIsAuthenticated(true);
  localStorage.setItem("auth", "true");
};


const logout = () => {
  setIsAuthenticated(false);
  localStorage.removeItem("auth");
};


  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
