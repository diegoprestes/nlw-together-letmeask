import { ReactNode, useContext, useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextType);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fillUser(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    console.log(result);
    if (result.user) {
      fillUser(result.user);
    }
  }

  const fillUser = (user: firebase.User) => {
    const { displayName, photoURL, uid } = user;

    if (!displayName || !photoURL) {
      throw new Error("Missing information from Google Account.");
    }

    setUser({
      id: uid,
      name: displayName,
      avatar: photoURL,
    });
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
