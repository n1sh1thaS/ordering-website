"use server";
import clientPromise from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";
import { WithId } from "mongodb";
import { Document } from "bson"
import { Product } from "@/lib/constants";

export async function GET(req: NextRequest){
    try {
        const client = await clientPromise;

        // get search params
        const searchParams = new URL(req.url).searchParams
        const query = searchParams.get('query');
        const title = searchParams.get('title')
        const type = searchParams.get('type')
        const sku = searchParams.get('sku')
        const maxPrice = searchParams.get('maxPrice')

        let data: WithId<Document>[];

        // search by chat input
        if(title || type || sku || maxPrice){
            const filter: any = {};

            if (title) {
                filter.Title = { $regex: title, $options: 'i' };
            }
            if (type) {
                filter.Type = type;
            }
            if (sku) {
                filter["Variant SKU"] = sku;
            }
            if (maxPrice) {
                filter["Variant Price"] = { $lte: parseFloat(maxPrice) };
            }

            data = await client.db('store').collection('products').find(filter, {projection: {_id: 1, Title: 1, 'Variant SKU': 1, 'Variant Price': 1, 'Image Src': 1}}).toArray();
        }
        // search by sku or title
        else if (query && query !== ''){
            data = await client.db('store').collection('products').find({$or:[ {Title: { $regex: query, $options: 'i' }}, {'Variant SKU': query}]}, {projection: {_id: 1, Title: 1, 'Variant SKU': 1, 'Variant Price': 1, 'Image Src': 1}}).toArray();
        }
        // all products
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
        return NextResponse.json({error: 'Error fetching products', status: 500})
    }
}