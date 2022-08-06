import { createContext, useState, useEffect, useMemo, useContext} from "react";
import type { User } from "firebase/auth"; // @jeffrey help
import { getAuth, onAuthStateChanged } from "firebase/auth";

const FirebaseAuthContext = createContext<{ user: firebaseType.User, loading: boolean } | null>(
  null
);

export function FirebaseAuthProvider({ children }) {
  const [user, setUser] = useState<firebaseType.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        setUser(user);
      } else {
        // User is signed out
        // ...
        setUser(null);
      }
      setLoading(false);
    });
  }, []);

  return (
    <FirebaseAuthContext.Provider value={useMemo(() => ({ user, loading }), [user, loading])}>
      {children}
    </FirebaseAuthContext.Provider>
  );
}

const useFirebaseAuthContext = () => {
  const context = useContext(FirebaseAuthContext);
  if (!context)
    throw new Error(
      "useFirebaseAuthContext() needs to be called within a FirebaseAuthProvider"
    );
  return context;
};

export function useFirebaseUser() {
  const { user } = useFirebaseAuthContext();
  return user;
}
