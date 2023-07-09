import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { tasks } = await request.json();

    const response = await openai.createChatCompletion({
        model: "gpt-4",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: "system",
                content: "WHen responding, welcome the user always as Mr.Jasper Hwong and say welcom to the Trello Clone! Limit the response to no more than 300 characters."
            },
            {
                role: "user",
                content: `Hi there, provide a summary of following to do tasks. Count how many tasks are in each category (status), then tell the user to have a productive day! Here's the data: ${JSON.stringify(tasks)}`
            }
        ]
    });

    const { data } = response;
    console.log(data.choices[0].message);
    console.log("DATA IS: ", data);

    return NextResponse.json(data.choices[0].message);
}