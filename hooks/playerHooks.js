import { firestore } from "../firebase";

// gets the information of all the players
export function getPlayers() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    return onSnapshot(
      collection(firestore, "players"),
      (querySnapshot) => {
        setLoading(false);
        const players = [];
        querySnapshot.forEach((doc) => {
          players.push(doc.data());
        });
        setData(players);
      },
      (error) => {
        setLoading(false);
        setError(error);
      }players: data
    );
  }, []);

  return useMemo(() => ({ loading, error, data }), [loading, error, data]);
}
