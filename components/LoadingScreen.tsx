import React from "react";
import { useFirebaseAuthContext } from "../context/FirebaseAuthContext";
import { usePlayersDataLoadStatus } from "../context/PlayersDataContext";
import AppShell from "./AppShell";
import LoginScreen from "./LoginScreen";

export default function LoadingScreen({ children }) {
  const { loading, error } = usePlayersDataLoadStatus();
  const {
    loading: authLoading,
    user,
    eventAvailable,
  } = useFirebaseAuthContext();

  if (loading || authLoading) {
    return <AppShell>Loading...</AppShell>;
  }
  if (!user) {
    return <LoginScreen />;
  }
  if (!eventAvailable) {
    return (
      <AppShell>
        <h1>
          The event is not yet available, but stick around—this page should
          reload once it's ready.
        </h1>
      </AppShell>
    );
  }
  if (error) {
    return <div>Error: {"" + error}</div>;
  }
  return children;
}
