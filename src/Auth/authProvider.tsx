import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
 
interface AuthContextProps {
  children: ReactNode;
}
 
const AuthContext = createContext<User | null>(null);
 
export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();
 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
 
    return () => unsubscribe();
  }, [auth]);
 
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
 
export const useAuth = (): User | null => {
  return useContext(AuthContext);
};