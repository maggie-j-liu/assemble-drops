import React from "react";
import { useFirebaseUser } from "../context/FirebaseAuthContext";
import { usePlayersDataLoadStatus } from "../context/PlayersDataContext";
import LoginScreen from "./LoginScreen";

export default function LoadingScreen({ children }) {
  const { loading, error } = usePlayersDataLoadStatus();
  const { loading: authLoading, user } = useFirebaseUser();

  if (loading || authLoading) {
    return <div>Loading... todo</div>;
  }
  if (!user) {
    return <LoginScreen />;
  }
  if (error) {
    return <div>Error: {"" + error}</div>;
  }
  return user;
}
