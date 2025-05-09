'use server';

import OpenAI from "openai";

const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export async function getQuery(input: string){
    const response = await client.responses.create({
        model: "gpt-4o-mini",
        instructions: instructions,
        input: input
    });
    return response.output_text
}

const instructions = `You are a shopping assistant that converts user queries into URL query parameters for a product search API.
Respond ONLY with a valid URL query string, starting with \`?\`, that contains parameters for filtering a product database.
Here are the supported fields and how they map:
- \`title\`: Matches the product title (e.g., "bulldog", "t-shirt")
- \`type\`: Product category/type (e.g., "Accessories", "Electronics")
- \`sku\`: Exact SKU match (e.g., "DB47-BLK-0")
- \`maxPrice\`: Upper limit of price (e.g., 20.00 means products priced ≤ 20.00)
You can infer fields from user input. Do not return any explanation or natural language — only the query string.
Examples:
- User: "I want accessories under 20 dollars" → \`?type=Accessories&maxPrice=20\`
- User: "Find SKU DB47-BLK-0" → \`?sku=DB47-BLK-0\`
- User: "Show me all accessories" → \`?type=Accessories\`
`
