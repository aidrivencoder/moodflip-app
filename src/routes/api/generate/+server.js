import { json } from '@sveltejs/kit';
import { OPENROUTER_API_KEY } from '$env/static/private';

const YOUR_SITE_URL = 'https://moodflip.aidrivencoder.com/';
const YOUR_SITE_NAME = 'MoodFlip App';

export async function POST({ request }) {
    try {
        const { situation } = await request.json();

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "HTTP-Referer": YOUR_SITE_URL,
                "X-Title": YOUR_SITE_NAME,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "meta-llama/llama-3.2-1b-instruct:free",
                "messages": [
                    {
                        "role": "system",
                        "content": "You are a positive and encouraging AI assistant. Your task is to take a user's situation and provide a short, humorous, uplifting perspective on it. Use emojis where appropriate to enhance the positive message. Keep your response concise, ideally within 1-2 sentences."
                    },
                    {
                        "role": "user",
                        "content": `Please provide a short positive perspective on this situation: ${situation}`
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('Failed to get response from OpenRouter API');
        }

        const data = await response.json();
        return json({ response: data.choices[0].message.content });
    } catch (error) {
        console.error('Error generating positive response:', error);
        return json(
            { error: 'Oops! 😅 Something went wrong. Please try again later!' },
            { status: 500 }
        );
    }
}
