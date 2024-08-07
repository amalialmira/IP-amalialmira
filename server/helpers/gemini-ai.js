const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);


async function geminiAi(genre, mood, books) {
    const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: { responseMimeType: "application/json"}
    });

    const prompt = `give me a 5 book reccomendation with ${genre} genre and with the ${mood} mood / vibes
    strictly based on property category and description of data from ${books}. The reccomendation cannot be from other sources.
    response must be a format JSON like this:
    [
        {
            "id": ...,
            "title": ...,
            "category": ...,
            "imgUrl": ...,
        }
    ] exlude the property "description" from the result`
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    text = JSON.parse(text)
    // console.log(text);

    return text
}

module.exports = geminiAi
  
