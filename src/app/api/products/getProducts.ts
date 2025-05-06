"use server";
import clientPromise from "@/lib/db";
import { WithId } from "mongodb";
import { Document } from "bson"
import { Product } from "@/lib/constants";
export async function getProducts(){
    try {
        const client = await clientPromise;
        const data: WithId<Document>[] = await client.db('store').collection('products').find({}, {projection: {_id: 1, Title: 1, 'Variant SKU': 1, 'Variant Price': 1, 'Image Src': 1}}).toArray();
        const products: Product[] = data.map((product) => {
            return {
                _id: product._id.toString(), 
                title: String(product.Title), 
                image: String(product['Image Src']), 
                sku: String(product['Variant SKU']), 
                price: Number(product['Variant Price'])
            }
        })
        return products || [];
    }
    catch (err) {
        console.error(err)
    }
}