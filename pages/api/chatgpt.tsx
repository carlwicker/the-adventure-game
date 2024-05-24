import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { useEffect } from "react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt,
        max_tokens: 60,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ message: response.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: "Error calling ChatGPT API" });
  }
}
