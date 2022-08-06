let examplePeople = [
  { name: "Nathan", score: 85 },
  { name: "Maggie", score: 90 },
  { name: "Jeffrey", score: 95 },
];
export default function Leaderboard() {
  return (
    <div className="w-1/2">
      <ul role="list" className="divide-y divide-gray-200">
        {examplePeople.map((person) => (
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
