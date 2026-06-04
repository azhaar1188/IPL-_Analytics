"use client";

import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";

export default function PlayersPage() {

  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [teamFilter, setTeamFilter] = useState("");

  useEffect(() => {

    fetch("http://127.0.0.1:8000/players")
      .then((res) => res.json())
      .then((data) => {

        setPlayers(data.players || []);

        setLoading(false);

      });

  }, []);

  const filteredPlayers = [...players]

  .filter((player) => {

    const matchesSearch =
      player.name.toLowerCase().includes(search.toLowerCase());

    const matchesTeam =
      teamFilter === "" || player.team === teamFilter;

    return matchesSearch && matchesTeam;

  })

  .sort((a: any, b: any) => {

    if (sortBy === "runs") {
      return b.runs - a.runs;
    }

    if (sortBy === "strike_rate") {
      return b.strike_rate - a.strike_rate;
    }

    return 0;

  });

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold animate-pulse">
          Loading Players...
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <div className="ml-72 p-8">

        <h1 className="text-5xl font-bold mb-10">
          IPL Players
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-10">

  <input
    type="text"
    placeholder="Search Players..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      flex-1
      p-4
      rounded-2xl
      bg-zinc-900
      border
      border-zinc-700
      outline-none
    "
  />

  <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="
      p-4
      rounded-2xl
      bg-zinc-900
      border
      border-zinc-700
    "
  >

    <option value="">
      Sort Players
    </option>

    <option value="runs">
      Highest Runs
    </option>

    <option value="strike_rate">
      Highest Strike Rate
    </option>

  </select>

  <select
  value={teamFilter}
  onChange={(e) => setTeamFilter(e.target.value)}
  className="
    p-4
    rounded-2xl
    bg-zinc-900
    border
    border-zinc-700
  "
>

  <option value="">
    All Teams
  </option>

  <option value="RCB">
    RCB
  </option>

  <option value="MI">
    MI
  </option>

  <option value="CSK">
    CSK
  </option>

</select>

</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

  {filteredPlayers.map((player, index) => (

    <div
      key={index}
      onClick={() => setSelectedPlayer(player)}
      className="
        bg-zinc-900
        border
        border-zinc-700
        rounded-3xl
        p-6
        hover:border-blue-500
        hover:scale-105
        transition-all
        cursor-pointer
      "
    >

      <div className="flex items-center gap-4 mb-6">

        <img
          src={player.image}
          alt={player.name}
          className="
            w-20
            h-20
            rounded-full
            border-4
            border-blue-500
            object-cover
          "
        />

        <div>

          <h2 className="text-2xl font-bold">
            {player.name}
          </h2>

        </div>

      </div>

      <div className="space-y-3 text-lg">

        <p>
          Runs:
          <span className="text-blue-400 ml-2 font-bold">
            {player.runs}
          </span>
        </p>

        <p>
          Strike Rate:
          <span className="text-green-400 ml-2 font-bold">
            {player.strike_rate}
          </span>
        </p>

        <p>
  Team:
  <span className="text-yellow-400 ml-2 font-bold">
    {player.team}
  </span>
</p>

<p>
  Role:
  <span className="text-purple-400 ml-2 font-bold">
    {player.role}
  </span>
</p>

      </div>

    </div>

  ))}

</div>

{selectedPlayer && (

  <div
    className="
      fixed
      inset-0
      bg-black/70
      flex
      items-center
      justify-center
      z-50
    "
  >

    <div
      className="
        bg-zinc-900
        p-8
        rounded-3xl
        w-full
        max-w-md
        border
        border-zinc-700
        relative
      "
    >

      <button
        onClick={() => setSelectedPlayer(null)}
        className="
          absolute
          top-4
          right-4
          text-2xl
        "
      >
        ✕
      </button>

      <img
        src={selectedPlayer.image}
        alt={selectedPlayer.name}
        className="
          w-32
          h-32
          rounded-full
          border-4
          border-blue-500
          mx-auto
          mb-6
          object-cover
        "
      />

      <h2 className="text-4xl font-bold text-center mb-6">
        {selectedPlayer.name}
      </h2>

      <div className="space-y-4 text-xl">

        <p>
          Runs:
          <span className="text-blue-400 ml-2">
            {selectedPlayer.runs}
          </span>
        </p>

        <p>
          Strike Rate:
          <span className="text-green-400 ml-2">
            {selectedPlayer.strike_rate}
          </span>
        </p>

        <p>
  Average:
  <span className="text-yellow-400 ml-2">
    {selectedPlayer.average}
  </span>
</p>

<p>
  Matches:
  <span className="text-red-400 ml-2">
    {selectedPlayer.matches}
  </span>
</p>

<p>
  Fours:
  <span className="text-blue-400 ml-2">
    {selectedPlayer.fours}
  </span>
</p>

<p>
  Sixes:
  <span className="text-green-400 ml-2">
    {selectedPlayer.sixes}
  </span>
</p>

<p>
  Team:
  <span className="text-pink-400 ml-2">
    {selectedPlayer.team}
  </span>
</p>

<p>
  Role:
  <span className="text-purple-400 ml-2">
    {selectedPlayer.role}
  </span>
</p>

      </div>

    </div>

  </div>

)}

      </div>

    </main>
  );
}