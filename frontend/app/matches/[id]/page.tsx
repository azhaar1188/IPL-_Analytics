"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function MatchDetailsPage() {

    const params = useParams();
    const id = params.id;
    const [match, setMatch] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [selectedInning, setSelectedInning] = useState(0);

 useEffect(() => {
      if (!id) return;
      
  async function fetchMatch() {

    const response = await fetch(
      `http://127.0.0.1:8000/ipl/match/${id}`
    );

    const data = await response.json();

    setMatch(data?.data || data);

    setLoading(false);
  }

  fetchMatch();

}, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Loading Match...
        </h1>
      </main>
    );
  }

  if (!match) {
    return (
      <main className="min-h-screen bg-black text-red-500 flex items-center justify-center">
        Match not found
      </main>
    );
  }
  console.log(match);
  console.log(Object.keys(match));

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-5xl font-bold mb-4">
        {match.name}
      </h1>

      <p className="text-blue-400 text-xl mb-2">
        {match.status}
      </p>

      <p className="text-zinc-400 mb-2">
        Venue: {match.venue}
      </p>

      <p className="text-zinc-400 mb-10">
        Date: {match.date}
      </p>

      <div className="
  bg-zinc-900
  border
  border-zinc-700
  rounded-2xl
  p-6
  mb-10
">

  <h2 className="text-2xl font-bold mb-4">
    Match Summary
  </h2>

  <p className="mb-2">
  Toss:
  <span className="text-blue-400 ml-2">
    {match.tossWinner}
  </span>

  <span className="text-zinc-400 ml-2">
    chose to
  </span>

  <span className="text-yellow-400 ml-2 capitalize">
    {match.tossChoice}
  </span>
</p>

  <p className="mb-2">
    Winner:
    <span className="text-green-400 ml-2">
      {match.matchWinner}
    </span>
  </p>

  <p>
    Result:
    <span className="text-yellow-400 ml-2">
      {match.status}
    </span>
  </p>

</div>

{/* TOP PERFORMERS */}

<div className="
  grid
  md:grid-cols-2
  gap-6
  mb-10
">

  {/* HIGHEST SCORER */}

  <div className="
    bg-zinc-900
    border
    border-zinc-700
    rounded-2xl
    p-6
  ">

    <h2 className="text-2xl font-bold mb-4 text-orange-400">
      Highest Scorer
    </h2>

    {(() => {

      const allBatters =
        match.scorecard?.flatMap(
          (inning: any) => inning.batting || []
        ) || [];

      const topScorer = allBatters.reduce(
        (best: any, player: any) =>
          player.r > best.r ? player : best,
        allBatters[0]
      );

      return topScorer ? (

        <div>

          <h3 className="text-3xl font-bold">
            {topScorer.batsman.name}
          </h3>

          <p className="text-5xl font-bold text-orange-400 mt-3">
            {topScorer.r}
          </p>

          <p className="text-zinc-400 mt-2">
            {topScorer.b} balls • SR {topScorer.sr}
          </p>

        </div>

      ) : null;

    })()}

  </div>

  {/* HIGHEST WICKET TAKER */}

  <div className="
    bg-zinc-900
    border
    border-zinc-700
    rounded-2xl
    p-6
  ">

    <h2 className="text-2xl font-bold mb-4 text-red-400">
      Highest Wicket Taker
    </h2>

    {(() => {

      const allBowlers =
        match.scorecard?.flatMap(
          (inning: any) => inning.bowling || []
        ) || [];

      const topBowler = allBowlers.reduce(
        (best: any, bowler: any) =>
          bowler.w > best.w ? bowler : best,
        allBowlers[0]
      );

      return topBowler ? (

        <div>

          <h3 className="text-3xl font-bold">
            {topBowler.bowler.name}
          </h3>

          <p className="text-5xl font-bold text-red-400 mt-3">
            {topBowler.w}
          </p>

          <p className="text-zinc-400 mt-2">
            wickets • Economy {topBowler.eco}
          </p>

        </div>

      ) : null;

    })()}

  </div>

</div>

<div className="
  bg-zinc-900
  border
  border-zinc-700
  rounded-2xl
  p-6
  mb-10
">

  <h2 className="text-2xl font-bold mb-6">
    Teams
  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    {match.teamInfo?.map((team: any, index: number) => (

      <div
        key={index}
        className="
          bg-zinc-800
          p-6
          rounded-2xl
          border
          border-zinc-700
        "
      >

        <img
          src={team.img}
          alt={team.name}
          className="w-24 h-24 object-contain mb-4"
        />

        <h3 className="text-2xl font-bold">
          {team.name}
        </h3>

        <p className="text-zinc-400 mt-2">
          {team.shortname}
        </p>

      </div>

    ))}

  </div>

</div>

      {/* SCORE */}

      <div className="grid md:grid-cols-2 gap-6">

        {match.score?.map((inning: any, index: number) => (

          <div
            key={index}
            className="
              bg-zinc-900
              border
              border-zinc-700
              rounded-2xl
              p-6
            "
          >

            <h2 className="text-2xl font-bold mb-4">
              {inning.inning}
            </h2>

            <p className="text-4xl font-bold text-blue-400">
              {inning.r}/{inning.w}
            </p>

            <p className="text-zinc-400 mt-2">
              Overs: {inning.o}
            </p>

          </div>

        ))}

      </div>

      <div className="mt-16">

  <h2 className="text-3xl font-bold mb-6">
    Innings Breakdown
  </h2>

  <div className="space-y-6">

    {match.score?.map((inning: any, index: number) => (

      <div
        key={index}
        className="
          bg-zinc-900
          border
          border-zinc-700
          rounded-2xl
          p-6
        "
      >

        <div className="flex justify-between items-center">

          <h3 className="text-2xl font-bold">
            {inning.inning}
          </h3>

          <div className="text-right">

            <p className="text-4xl font-bold text-blue-400">
              {inning.r}/{inning.w}
            </p>

            <p className="text-zinc-400">
              Overs: {inning.o}
            </p>

          </div>

        </div>

      </div>

    ))}

  </div>

</div>

<div className="mt-16">

  <h2 className="text-3xl font-bold mb-8">
    Full Scorecard
  </h2>

  {/* TEAM BUTTONS */}

  <div className="flex gap-4 mb-8">

    {match.scorecard?.map((inningData: any, index: number) => (

      <button
        key={index}
        onClick={() => setSelectedInning(index)}
        className={`
          px-6
          py-3
          rounded-xl
          font-bold
          transition
          ${
            selectedInning === index
              ? "bg-blue-500 text-white"
              : "bg-zinc-800 text-zinc-300"
          }
        `}
      >

        {inningData.inning.split(" Inning")[0]}

      </button>

    ))}

  </div>

  {/* SELECTED INNING */}

  {match.scorecard?.[selectedInning] && (

    <div
      className="
        bg-zinc-900
        border
        border-zinc-700
        rounded-2xl
        p-6
        mb-10
      "
    >

      <h3 className="text-2xl font-bold mb-6">
        {match.scorecard[selectedInning].inning}
      </h3>

      {/* BATTING */}

      <h4 className="text-xl font-bold mb-4 text-blue-400">
        Batting
      </h4>

      <div className="overflow-x-auto mb-10">

        <table className="w-full">

          <thead>

            <tr className="border-b border-zinc-700">

              <th className="p-3 text-left">
                Batsman
              </th>

              <th className="p-3 text-left">
                R
              </th>

              <th className="p-3 text-left">
                B
              </th>

              <th className="p-3 text-left">
                4s
              </th>

              <th className="p-3 text-left">
                6s
              </th>

              <th className="p-3 text-left">
                SR
              </th>

            </tr>

          </thead>

          <tbody>

            {match.scorecard[selectedInning].batting?.map(
              (player: any, i: number) => (

                <tr
                  key={i}
                  className="border-b border-zinc-800"
                >

                  <td className="p-3">

                    <div>

                      <p className="font-semibold">
                        {player.batsman.name}
                      </p>

                      <p className="text-zinc-500 text-sm mt-1">
                        {player["dismissal-text"] || "not out"}
                      </p>

                    </div>

                  </td>

                  <td className="p-3 text-blue-400">
                    {player.r}
                  </td>

                  <td className="p-3">
                    {player.b}
                  </td>

                  <td className="p-3">
                    {player["4s"]}
                  </td>

                  <td className="p-3">
                    {player["6s"]}
                  </td>

                  <td className="p-3 text-green-400">
                    {player.sr}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      {/* BOWLING */}

      <h4 className="text-xl font-bold mb-4 text-red-400">
        Bowling
      </h4>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-zinc-700">

              <th className="p-3 text-left">
                Bowler
              </th>

              <th className="p-3 text-left">
                O
              </th>

              <th className="p-3 text-left">
                R
              </th>

              <th className="p-3 text-left">
                W
              </th>

              <th className="p-3 text-left">
                Eco
              </th>

            </tr>

          </thead>

          <tbody>

            {match.scorecard[selectedInning].bowling?.map(
              (bowler: any, i: number) => (

                <tr
                  key={i}
                  className="border-b border-zinc-800"
                >

                  <td className="p-3">
                    {bowler.bowler.name}
                  </td>

                  <td className="p-3">
                    {bowler.o}
                  </td>

                  <td className="p-3">
                    {bowler.r}
                  </td>

                  <td className="p-3 text-red-400">
                    {bowler.w}
                  </td>

                  <td className="p-3 text-yellow-400">
                    {bowler.eco}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  )}

</div>

      {/* TEAMS */}

      <div className="mt-16">

  <h2 className="text-3xl font-bold mb-6">
    Teams
  </h2>

  <div className="
    grid
    md:grid-cols-2
    gap-6
  ">

    {match.teamInfo?.map((team: any, index: number) => (

      <div
        key={index}
        className="
          bg-zinc-900
          border
          border-zinc-700
          rounded-2xl
          p-8
          text-center
        "
      >

        <img
          src={team.img}
          alt={team.name}
          className="
            w-28
            h-28
            mx-auto
            object-contain
            mb-6
          "
        />

        <h3 className="text-3xl font-bold">
          {team.name}
        </h3>

      </div>

    ))}

  </div>

</div>

    </main>
  );
}