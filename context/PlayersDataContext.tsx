import React from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { onValue, ref } from "firebase/database";
import { createContext, useEffect, useState, useMemo, useContext } from "react";
import { firestore, db } from "../firebase";
import type { Player } from "../types/Player";

const PlayersDataContext = createContext<{
  loading: boolean;
  error: Error | null;
  players: Player[] | null;
} | null>(null);

export const PlayersDataProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [players, setPlayers] = useState<Player[] | null>(null);

  useEffect(() => {
    return onValue(
      ref(db, "players"),
      (snapshot) => {
        setLoading(false);
        setError(null);
        const players: Player[] = Object.values(snapshot.val() ?? {});
        setPlayers(players);
      },
      (error) => {
        setLoading(false);
        setError(error);
      }
    );
    // old code for firest
    // return onSnapshot(
    //   collection(firestore, "players"),
    //   (querySnapshot) => {
    //     setLoading(false);
    //     setError(null);
    //     const players: Player[] = [];
    //     querySnapshot.forEach((doc) => players.push(doc.data() as Player));
    //     setPlayers(players);
    //   },
    //   (error) => {
    //     setLoading(false);
    //     setError(error);
    //   }
    // );
  }, []);

  return (
    <PlayersDataContext.Provider
      value={useMemo(
        () => ({ loading, error, players }),
        [loading, error, players]
      )}
    >
      {children}
    </PlayersDataContext.Provider>
  );
};

const usePlayersDataContext = () => {
  const context = useContext(PlayersDataContext);
  if (!context)
    throw new Error(
      "usePlayersDataContext() must be called within a PlayersDataProvider"
    );
  return context;
};

export const usePlayersDataLoadStatus = () => {
  const { loading, error } = usePlayersDataContext();
  return { loading, error, hasLoadedSuccessfully: !loading && !error };
};

export const usePlayersData = () => {
  const { hasLoadedSuccessfully } = usePlayersDataLoadStatus();
  if (!hasLoadedSuccessfully)
    throw new Error(
      "usePlayersData() was called when the player data hasn't been loaded successfully yet"
    );
  const { players } = usePlayersDataContext();
  if (!players)
    throw new Error(
      "players data is null but it shouldn't be null... maybe firestore just got wiped?"
    );
  return players;
};
