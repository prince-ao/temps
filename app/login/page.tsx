"use client";
import { useState, useEffect } from "react";

interface CandidateRaw {
  id: number;
  name: string;
}

export default function Home() {
  const [username_, setUsername] = useState("");
  const [password_, setPassword] = useState("");
  const [candidate, setCandidate] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [freqMap, setFreqMap] = useState<Map<string, number> | undefined>();

  const password = "Coolcoolboy1";
  const username = "anon";

  useEffect(() => {
    (async () => {
      const result = await fetch("/api/vote");
      const result_json = (await result.json()).rows as CandidateRaw[];
      const x = result_json.map(({ name }) => name);
      const frequencyMap = new Map<string, number>();

      for (const item of x) {
        if (frequencyMap.has(item)) {
          frequencyMap.set(item, frequencyMap.get(item)! + 1);
        } else {
          frequencyMap.set(item, 1);
        }
      }

      setFreqMap(frequencyMap);
    })();
  }, []);

  return (
    <main className="flex flex-col w-[50%] ms-8">
      {!loggedIn ? (
        <>
          <label>username</label>
          <input
            className="text-black"
            type="text"
            value={username_}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>password</label>
          <input
            className="text-black mb-8"
            type="password"
            value={password_}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-slate-500"
            onClick={() => {
              if (password === password_ && username === username_) {
                setLoggedIn(true);
              }
            }}
          >
            Log in
          </button>
        </>
      ) : (
        <>
          {freqMap &&
            [...freqMap.entries()].map(([key, value], i) => (
              <>
                <div key={i}>
                  {key}: {value}
                </div>
              </>
            ))}
          <label>name</label>
          <input
            className="text-black mb-8"
            type="text"
            value={candidate}
            onChange={(e) => setCandidate(e.target.value)}
          />
          <button
            className="bg-slate-500 mb-8"
            onClick={() => {
              fetch("/api/candidates", {
                method: "POST",
                body: JSON.stringify({ name: candidate }),
              });
              setCandidate("");
            }}
          >
            Add candidate
          </button>
          <button
            className="bg-slate-500 mb-8"
            onClick={() => {
              fetch("/api/candidates", {
                method: "DELETE",
                body: JSON.stringify({ name: candidate }),
              });
              setCandidate("");
            }}
          >
            Remove candidate
          </button>
          <button
            className="bg-slate-500"
            onClick={() => {
              setLoggedIn(false);
            }}
          >
            Log out
          </button>
        </>
      )}
    </main>
  );
}
