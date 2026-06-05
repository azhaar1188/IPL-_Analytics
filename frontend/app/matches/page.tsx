"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Link from "next/link";

export default function MatchesPage() {

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("completed");
  const [search, setSearch] = useState("");

  useEffect(() => {

  setLoading(true);

  fetch(`http://127.0.0.1:8000/ipl/${filter}`)
    .then((res) => res.json())
    .then((data) => {

      setMatches(data);

      setLoading(false);

    });

}, [filter]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Loading Matches...
        </h1>
      </main>
    );
  }

  const sortedMatches = [...matches].sort((a: any, b: any) => {
  const getMatchNo = (name: string) => {
    const match = name.match(/(\d+)(?:st|nd|rd|th) Match/i);

    if (match) return parseInt(match[1]);

    if (name.includes("Qualifier 1")) return 71;
    if (name.includes("Eliminator")) return 72;
    if (name.includes("Qualifier 2")) return 73;
    if (name.includes("Final")) return 74;

    return 999;
  };

  return getMatchNo(b.name) - getMatchNo(a.name);
});

const filteredMatches = sortedMatches.filter((match: any) =>
  match.teams?.some((team: string) =>
    team.toLowerCase().includes(search.toLowerCase())
  )
);

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <Navbar />

      <div className="pt-28 px-8">

        <h1 className="text-5xl font-bold mb-10">
          IPL 2025 Matches
        </h1>
        
        <div className="flex gap-4 mb-10">

          <button
    onClick={() => setFilter("completed")}
    className={`
      px-5 py-2 rounded-xl transition
      ${
        filter === "completed"
          ? "bg-green-500 text-white"
          : "bg-zinc-800 text-zinc-300"
      }
    `}
  >
    Completed
  </button>

  <button
    onClick={() => setFilter("live")}
    className={`
      px-5 py-2 rounded-xl transition
      ${
        filter === "live"
          ? "bg-red-500 text-white"
          : "bg-zinc-800 text-zinc-300"
      }
    `}
  >
    Live
  </button>

  <button
    onClick={() => setFilter("upcoming")}
    className={`
      px-5 py-2 rounded-xl transition
      ${
        filter === "upcoming"
          ? "bg-blue-500 text-white"
          : "bg-zinc-800 text-zinc-300"
      }
    `}
  >
    Upcoming
  </button>

  <input
  type="text"
  placeholder="Search team..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="bg-zinc-800 text-white px-5 py-2 rounded-xl outline-none border border-zinc-700"
/>

</div>

        <div className="grid md:grid-cols-2 gap-6">

          {filteredMatches.map((match: any, index) => (

  <Link
    key={index}
    href={`/matches/${match.id}`}
  >

   <div
  className="
  bg-zinc-800/60
  border
  border-zinc-700
  rounded-2xl
  p-6
  h-[300px]
  flex
  flex-col
  hover:border-blue-500
  hover:scale-105
  transition
  cursor-pointer
"
>

      <h2 className="text-2xl font-bold mb-3">
        {match.name}
      </h2>

      <p className="text-blue-400 mb-3">
        {match.status}
      </p>

      <p className="text-zinc-400 mb-2">
        Venue: {match.venue}
      </p>

      <p className="text-zinc-400 mb-4">
        Date: {match.date}
      </p>

      <div className="flex gap-2 flex-wrap mt-auto">

        {match.teams?.map((team: string, i: number) => (

          <div
            key={i}
            className="
              px-4
              py-2
              bg-zinc-700
              rounded-xl
            "
          >
            {team}
          </div>

        ))}

      </div>

    </div>

  </Link>

))}

        </div>

      </div>

    </main>
  );
}
