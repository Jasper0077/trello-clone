import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-lm6lyuRkAhOXAgbUnv5lYJir",
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export default openai;