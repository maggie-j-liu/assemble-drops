import { createContext, useState, useEffect, useMemo, useContext } from "react";
import type { User } from "firebase/auth"; // @jeffrey help
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, onSnapshot, doc } from "firebase/firestore";
import { firestore } from "../firebase";
import AppShell from "../components/AppShell";

<<<<<<< HEAD
const FirebaseAuthContext = createContext<{ user: User, loading: boolean } | null>(
  null
);
=======
const FirebaseAuthContext = createContext<{
  user: User;
  loading: boolean;
} | null>(null);
>>>>>>> 15c54fed40bc22f71379ddc51e2d205186f9e3e8

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

  return (
    <FirebaseAuthContext.Provider
      value={useMemo(
        () => ({ user, loading: loading || availableLoading }),
        [user, loading, availableLoading]
      )}
    >
      {availableLoading || available ? (
        children
      ) : (
        <AppShell>
          <h1>
            The event is not yet available, but stick around—this page should
            reload once it's ready.
          </h1>
        </AppShell>
      )}
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
