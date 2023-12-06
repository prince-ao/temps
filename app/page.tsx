"use client";
import { useEffect, useState } from "react";

interface CandidateRaw {
  id: number;
  name: string;
}

export default function Home() {
  const [rows, setRows] = useState<CandidateRaw[]>([]);
  const [option, setOption] = useState("");
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetch("/api/candidates");
        const response_json = await result.json();
        setRows(response_json.rows as CandidateRaw[]);
      } catch (e) {
        console.log(e);
      }
    })();
    if (localStorage.getItem("voted") === "yes") {
      setVoted(true);
    }
  }, []);

  return (
    <main className="">
      {!voted ? (
        <>
          <fieldset>
            <legend>Candidates:</legend>
            {rows &&
              rows?.map(({ id, name }) => (
                <div key={id}>
                  <input
                    type="radio"
                    name={name}
                    value={name}
                    onChange={(e) => setOption(e.target.value)}
                  />
                  <label className="ms-2">{name}</label>
                </div>
              ))}
          </fieldset>
          <button
            className="bg-slate-500 mt-6"
            onClick={() => {
              fetch("/api/vote", {
                method: "POST",
                body: JSON.stringify({ option }),
              });
              localStorage.setItem("voted", "yes");
              setVoted(true);
              console.log(option);
              setOption("");
            }}
          >
            Vote!
          </button>
        </>
      ) : (
        <>
          <h1>You Voted!</h1>
        </>
      )}
    </main>
  );
}
