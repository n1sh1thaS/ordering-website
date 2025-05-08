"use server";
import clientPromise from "@/lib/db";

export async function addItem(item: {product_id: string, title: string, sku: string, image: string, price: number}){
    try {
        const client = await clientPromise;
        await client.db('store').collection('cart').insertOne(item)
        console.log('item added')
    }
    catch (err) {
        console.error(err)
    }
}