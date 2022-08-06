import { usePlayersData } from "../context/PlayersDataContext";

export default function Leaderboard() {
  const people = usePlayersData();
  return (
    <div className="w-full sm:w-1/2">
      <ul role="list" className="divide-y divide-gray-200">
        {people.map((person) => (
          <li key={person.name} className="py-4">
            <div className="flex space-x-3">
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">{person.name}</h3>
                  <p className="text-sm text-gray-500">{person.score}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
