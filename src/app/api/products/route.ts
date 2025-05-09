"use server";
import clientPromise from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { WithId } from "mongodb";
import { Document } from "bson"
import { Product } from "@/lib/constants";

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