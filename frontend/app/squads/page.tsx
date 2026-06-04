"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";

export default function SquadsPage() {

  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeam, setSelectedTeam] = useState("ALL");
  const [search, setSearch] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [roleFilter, setRoleFilter] = useState("ALL");

  useEffect(() => {

    fetch("/data/squads.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTeams(data);
      });

  }, []);
  
const totalTeams = teams.length;

const totalPlayers = teams.reduce(
  (total: number, team: any) =>
    total + team.players.length,
  0
);

const overseasPlayers = teams.reduce(
  (total: number, team: any) =>
    total +
    team.players.filter(
      (player: any) => player.country !== "India"
    ).length,
  0
);

const indianPlayers =
  totalPlayers - overseasPlayers;
  const searchedPlayers = teams.flatMap((team: any) =>
  team.players
    .filter((player: any) => {
      const matchesSearch =
        player.name.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "ALL" ||
        player.role.toLowerCase().includes(roleFilter.toLowerCase());

      return search !== "" && matchesSearch && matchesRole;
    })
    .map((player: any) => ({
      ...player,
      teamName: team.teamName,
      teamShort: team.shortname,
      teamLogo: team.img,
    }))
);
  return (
  <main className="min-h-screen bg-black text-white">

    <Navbar />

    <div className="pt-28 px-8">
      <h1>Squads Page</h1>
      <div className="flex gap-4 mb-10 flex-wrap">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">

  <div className="bg-zinc-900 p-6 rounded-2xl">
    <p className="text-zinc-400">
      Teams
    </p>

    <h2 className="text-4xl font-bold text-blue-400">
      {totalTeams}
    </h2>
  </div>

  <div className="bg-zinc-900 p-6 rounded-2xl">
    <p className="text-zinc-400">
      Players
    </p>

    <h2 className="text-4xl font-bold text-green-400">
      {totalPlayers}
    </h2>
  </div>

  <div className="bg-zinc-900 p-6 rounded-2xl">
    <p className="text-zinc-400">
      Indian
    </p>

    <h2 className="text-4xl font-bold text-yellow-400">
      {indianPlayers}
    </h2>
  </div>

  <div className="bg-zinc-900 p-6 rounded-2xl">
    <p className="text-zinc-400">
      Overseas
    </p>

    <h2 className="text-4xl font-bold text-purple-400">
      {overseasPlayers}
    </h2>
  </div>

</div>
<div className="flex gap-4 mb-10 flex-wrap">

  <button
  onClick={() => setSelectedTeam("ALL")}
  className={`
    px-4
    py-2
    rounded-xl
    transition
    ${
      selectedTeam === "ALL"
        ? "bg-blue-600 text-white"
        : "bg-zinc-800 text-zinc-300"
    }
  `}
>
    ALL
  </button>

  {teams.map((team: any) => (

   <button
  key={team.teamName}
  onClick={() => setSelectedTeam(team.teamName)}
  className={`
    px-4
    py-2
    rounded-xl
    transition
    ${
      selectedTeam === team.teamName
        ? "bg-blue-600 text-white"
        : "bg-zinc-800 text-zinc-300"
    }
  `}
>
      {team.shortname}
    </button>

  ))}

</div>

<input
  type="text"
  placeholder="Search player..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="
    w-full
    p-4
    mb-8
    rounded-xl
    bg-zinc-900
    border
    border-zinc-700
    outline-none
  "
/>
<div className="flex gap-3 mb-8 flex-wrap">

  <button
    onClick={() => setRoleFilter("ALL")}
    className={`
      px-4
      py-2
      rounded-xl
      transition
      ${
        roleFilter === "ALL"
          ? "bg-blue-600 text-white"
          : "bg-zinc-800 text-zinc-300"
      }
    `}
  >
    ALL
  </button>

  <button
    onClick={() => setRoleFilter("Batsman")}
    className={`
      px-4
      py-2
      rounded-xl
      transition
      ${
        roleFilter === "Batsman"
          ? "bg-blue-600 text-white"
          : "bg-zinc-800 text-zinc-300"
      }
    `}
  >
    Batsman
  </button>

  <button
    onClick={() => setRoleFilter("Bowler")}
    className={`
      px-4
      py-2
      rounded-xl
      transition
      ${
        roleFilter === "Bowler"
          ? "bg-blue-600 text-white"
          : "bg-zinc-800 text-zinc-300"
      }
    `}
  >
    Bowler
  </button>

  <button
    onClick={() => setRoleFilter("Allrounder")}
    className={`
      px-4
      py-2
      rounded-xl
      transition
      ${
        roleFilter === "Allrounder"
          ? "bg-blue-600 text-white"
          : "bg-zinc-800 text-zinc-300"
      }
    `}
  >
    Allrounder
  </button>

  <button
    onClick={() => setRoleFilter("WK")}
    className={`
      px-4
      py-2
      rounded-xl
      transition
      ${
        roleFilter === "WK"
          ? "bg-blue-600 text-white"
          : "bg-zinc-800 text-zinc-300"
      }
    `}
  >
    Wicket Keeper
  </button>

</div>
</div>
{search !== "" && (
  <div className="mb-16">

    <h2 className="text-4xl font-bold mb-8">
      Search Results
    </h2>

    {searchedPlayers.length === 0 && (
      <p className="text-zinc-400 text-xl">
        No players found.
      </p>
    )}

    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {searchedPlayers.map((player: any) => (
        <div
          key={player.id}
          onClick={() => setSelectedPlayer(player)}
          className="
            bg-zinc-900
            border
            border-zinc-700
            rounded-2xl
            p-4
            hover:border-blue-500
            hover:scale-105
            transition
            cursor-pointer
          "
        >
          <img
            src={player.playerImg}
            alt={player.name}
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
          />

          <h3 className="text-center font-bold text-xl text-white">
            {player.name}
          </h3>

          <p className="text-center text-blue-400">
            {player.role}
          </p>

          <p className="text-center text-zinc-400 text-sm">
            {player.teamShort}
          </p>
        </div>
      ))}
    </div>

  </div>
)}

{search === "" &&
  teams
    .filter(
      (team: any) =>
        selectedTeam === "ALL" ||
        team.teamName === selectedTeam
    )
    .map((team: any) => {

    const overseasPlayers = team.players.filter(
      (player: any) => player.country !== "India"
    ).length;

    const indianPlayers =
      team.players.length - overseasPlayers;
      const filteredTeamPlayers = team.players.filter((player: any) => {

  const matchesSearch =
    player.name
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesRole =
    roleFilter === "ALL" ||
    player.role
      .toLowerCase()
      .includes(roleFilter.toLowerCase());

  return matchesSearch && matchesRole;

});
      

    return (

      <div
        key={team.teamName}
        className="mb-16"
      >

   <div className="flex items-center gap-4 mb-2">

  <img
    src={team.img}
    alt={team.teamName}
    className="w-16 h-16 object-contain"
  />

  <h2 className="text-4xl font-bold text-white">
    {team.teamName}
  </h2>

</div>

<div className="mb-8">

  <p className="text-yellow-400 text-lg">
    Captain: {team.captain}
  </p>

  <p className="text-orange-400 text-lg font-semibold mt-2">
    🏆 IPL Titles: {team.trophies}
  </p>

</div>

<div className="flex gap-4 mb-8">

  <div className="bg-zinc-900 p-4 rounded-xl">
    <p className="text-zinc-400 text-sm">Total Players</p>
    <p className="text-2xl font-bold">
      {team.players.length}
    </p>
  </div>

  <div className="bg-zinc-900 p-4 rounded-xl">
    <p className="text-zinc-400 text-sm">Indian</p>
    <p className="text-2xl font-bold text-green-400">
      {indianPlayers}
    </p>
  </div>

  <div className="bg-zinc-900 p-4 rounded-xl">
    <p className="text-zinc-400 text-sm">Overseas</p>
    <p className="text-2xl font-bold text-yellow-400">
      {overseasPlayers}
    </p>
  </div>

</div>

{filteredTeamPlayers.length === 0 && (
  <p className="text-zinc-400 text-xl mb-6">
    No players found.
  </p>
)}
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

     {filteredTeamPlayers.map((player: any) => {

  const playerWithTeam = {
    ...player,
    teamName: team.teamName,
    teamShort: team.shortname,
    teamLogo: team.img,
  };

  return (

        <div
  key={player.id}
  onClick={() => setSelectedPlayer(playerWithTeam)}
  className="
    bg-zinc-900
    border
    border-zinc-700
    rounded-2xl
    p-4
    hover:border-blue-500
    hover:scale-105
    transition
    cursor-pointer
  "
>

          <img
            src={player.playerImg}
            alt={player.name}
            className="
              w-24
              h-24
              rounded-full
              mx-auto
              mb-4
              object-cover
            "
          />

          <h3 className="text-center font-bold text-xl text-white">
            {player.name}
          </h3>

          <p className="text-center text-blue-400">
            {player.role}
          </p>

          <p className="text-center text-zinc-400 text-sm">
            {player.country}
          </p>

        </div>
       );

})}

    </div>

  </div>
  );
  })}

{selectedPlayer && (

  <div
    className="
      fixed
      inset-0
      bg-black/80
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
        max-w-lg
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
          text-3xl
        "
      >
        ✕
      </button>

      <img
        src={selectedPlayer.playerImg}
        alt={selectedPlayer.name}
        className="
          w-32
          h-32
          rounded-full
          mx-auto
          mb-6
          object-cover
          border-4
          border-blue-500
        "
      />

      <h2
  className="
    text-4xl
    font-bold
    text-center
    mb-6
  "
>
  {selectedPlayer.name}
</h2>

<div className="flex items-center justify-center gap-3 mb-6">

  <img
    src={selectedPlayer.teamLogo}
    alt={selectedPlayer.teamName}
    className="w-10 h-10"
  />

  <span className="text-xl font-semibold">
    {selectedPlayer.teamShort}
  </span>

</div>

<div className="grid grid-cols-2 gap-4">

  <div className="bg-zinc-800 p-4 rounded-xl">
    <p className="text-zinc-400 text-sm">Role</p>
    <p className="font-bold text-blue-400">
      {selectedPlayer.role}
    </p>
  </div>

  <div className="bg-zinc-800 p-4 rounded-xl">
    <p className="text-zinc-400 text-sm">Country</p>
    <p className="font-bold text-green-400">
      {selectedPlayer.country}
    </p>
  </div>

  <div className="bg-zinc-800 p-4 rounded-xl">
    <p className="text-zinc-400 text-sm">Batting</p>
    <p className="font-bold text-yellow-400">
      {selectedPlayer.battingStyle}
    </p>
  </div>

  <div className="bg-zinc-800 p-4 rounded-xl">
    <p className="text-zinc-400 text-sm">Bowling</p>
    <p className="font-bold text-purple-400">
      {selectedPlayer.bowlingStyle || "N/A"}
    </p>
  </div>

</div>

    </div>

  </div>

)}
    </div>
    </main>
  );
}