import { usePlayersData } from "../context/PlayersDataContext";
import { useMemo } from "react";
import {auth} from "../firebase";
export default function Leaderboard() {
  const people = usePlayersData();
  const sortedPeople = useMemo(() => {
    return people.sort((a, b) => {
      return b.noiseScore - a.noiseScore;
    });
  }, [people]);
  const yourPlace = people.findIndex(
    (p) => p.uid === auth.currentUser.uid
  ) + 1;
  const maxScore = sortedPeople.length > 0 ? sortedPeople[0].noiseScore : 0;

  return (
    <div className="w-full sm:w-1/2">
      <h1 className="text-center text-3xl font-bold mb-4">Leaderboard</h1>
      <ul role="list" className="">
        {(yourPlace <= 5 ? sortedPeople.slice(0, 5) : [...sortedPeople.slice(0, 4), sortedPeople[yourPlace - 1]]).map((person) => (
          <li key={person.uid} className="p-4 relative">
            <div className="absolute inset-y-0 left-0 bg-blue-200" style={{ width: `${person.noiseScore/maxScore*100}%` }} />
            <div className="flex space-x-3 relative">
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{person.displayName}</h3>
                  <p className="text-sm text-gray-500">{Math.round(person.noiseScore) + " points"}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
