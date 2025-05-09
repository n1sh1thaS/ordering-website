"use server";
import clientPromise from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { WithId } from "mongodb";
import { Document } from "bson"
import { Product } from "@/lib/constants";
import OpenAI from "openai";

const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export async function GET(req: NextRequest){
    const query = new URL(req.url).searchParams.get('query');
    try {
        const client = await clientPromise;

        let data: WithId<Document>[];
        if (query !== ''){
            data = await client.db('store').collection('products').find({$or:[ {Title: { $regex: query, $options: 'i' }}, {'Variant SKU': query}]}, {projection: {_id: 1, Title: 1, 'Variant SKU': 1, 'Variant Price': 1, 'Image Src': 1}}).toArray();
        }
        else data = await client.db('store').collection('products').find({}, {projection: {_id: 1, Title: 1, 'Variant SKU': 1, 'Variant Price': 1, 'Image Src': 1}}).toArray();
        
        const products: Product[] = data.map((product) => {
            return {
                _id: product._id.toString(), 
                title: String(product.Title), 
                image: String(product['Image Src']), 
                sku: String(product['Variant SKU']), 
                price: Number(product['Variant Price'])
            }
        })
        return products ? NextResponse.json(products) : NextResponse.json([]);
    }
    catch (err) {
        console.error(err)
    }
}

async function getQuery(input: string){
    const response = await client.responses.create({
        model: "gpt-4o-mini",
        instructions: instructions,
        input: input
    });
    console.log(response.output_text)
    return response.output_text
}

const instructions = `You are a shopping assistant that converts user queries into URL query parameters for a product search API.
Respond ONLY with a valid URL query string, starting with \`api/products/?\`, that contains parameters for filtering a product database.
Here are the supported fields and how they map:
- \`title\`: Matches the product title (e.g., "bulldog", "t-shirt")
- \`tags\`: Matches any tag from the product (e.g., "silver", "belt buckle")
- \`type\`: Product category/type (e.g., "Accessories", "Electronics")
- \`sku\`: Exact SKU match (e.g., "DB47-BLK-0")
- \`maxPrice\`: Upper limit of price (e.g., 20.00 means products priced ≤ 20.00)
You can infer fields from user input. Do not return any explanation or natural language — only the query string.
Examples:
- User: "I want silver belt buckles under 20 dollars" → \`?tags=silver&tags=belt buckle&type=Accessories&maxPrice=20\`
- User: "Find SKU DB47-BLK-0" → \`?sku=DB47-BLK-0\`
- User: "Show me all accessories" → \`?type=Accessories\`
`
