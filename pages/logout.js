import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => (getAuth().signOut().then(() => router.push("/")), undefined), []);
  return <div>Loading...</div>;
}