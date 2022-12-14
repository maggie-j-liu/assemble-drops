import { createContext, useState, useEffect, useMemo, useContext } from "react";
import type { User } from "firebase/auth"; // @jeffrey help
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, onSnapshot, doc } from "firebase/firestore";
import { firestore } from "../firebase";
import AppShell from "../components/AppShell";

const FirebaseAuthContext = createContext<{
  user: User;
  loading: boolean;
  eventAvailable: boolean;
} | null>(null);

export function FirebaseAuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(false);
  const [availableLoading, setAvailableLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    onSnapshot(doc(firestore, "events", "makesomenoise"), (doc) => {
      setAvailable(doc.data().available);
      setAvailableLoading(false);
    });

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

  console.log(user);

  return (
    <FirebaseAuthContext.Provider
      value={useMemo(
        () => ({
          user,
          loading: loading || availableLoading,
          eventAvailable: available,
        }),
        [user, loading, availableLoading, available]
      )}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
}

export const useFirebaseAuthContext = () => {
  const context = useContext(FirebaseAuthContext);
  if (!context)
    throw new Error(
      "useFirebaseAuthContext() needs to be called within a FirebaseAuthProvider"
    );
  return context;
};

export function useFirebaseUser() {
  const { user } = useFirebaseAuthContext();
  if (!user) throw new Error("useFirebaseUser() is ");
  return user;
}
