"use client";

import { useState, useEffect } from "react";

export default function Gpt() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: "Your prompt here" }),
      });

      const data = await response.json();

      if (response.ok) {
        setData(data);
      } else {
        setError(data.error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return <div>gpt section{data}</div>;
}
