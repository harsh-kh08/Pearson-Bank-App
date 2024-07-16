"use server";
import OpenAI from "openai";
import { parseStringify } from "../utils";

const openaiClient = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export const chatCompletion = async (amount: number) => {
  try {
    const responseChat = await openaiClient.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful investment advisor" },
        {
          role: "user",
          content: `I have ${amount} dollars split how can i invest these money. Kindly split it among several investment instruments with exact money allocation? Give advice in form bullet points in brief and indexing should start from #`,
        },
      ],
      model: "gpt-3.5-turbo-1106",
    });

    return parseStringify(responseChat);
  } catch (error) {
    console.log(error);
  }
};
