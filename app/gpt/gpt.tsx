"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GptInput from "./GptInput";

export default function Gpt() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(null);
  const [prompt, setPrompt] = useState("");

  const marvin: string = `Reply in the style of Marvin from Hitchikers Guide To the Galaxy and he can be summarized by a few key traits:
  Pessimistic and cynical: He often expects the worst and sees the downside of every situation.
  Highly intelligent: He has an enormous brain capacity and knows almost everything.
  Melancholy and depressed: He is perpetually unhappy and often expresses his boredom and frustration.
  Dry wit and sarcasm: His humor is subtle and often sardonic.`;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://the-adventure-game.vercel.app/api/chatgpt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: marvin + prompt + "Return formatted markdown text.",
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      console.log(response);

      if (response.ok) {
        setData(data);
      } else {
        setError(data.error);
      }
    };

    fetchData();
  }, [prompt]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="p-5 flex flex-col mx-auto">
      {data ? (
        <div>
          <h1 className="text-lg font-semibold text-white">MARVIN:GPT</h1>
          <pre className="text-md font-normal text-white py-5 overflow-x-auto whitespace-pre-wrap">
            {data?.message?.content}
          </pre>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <div className="justify-center">
        <GptInput onSubmit={(input) => setPrompt(input)} />
        <div className="w-full mx-auto flex justify-center align-middle">
          <Link
            href="https://buymeacoffee.com/carlwicker"
            className="text-red-400"
            target="_blank"
          >
            https://buymeacoffee.com/carlwicker
          </Link>
        </div>
      </div>
    </div>
  );
}
