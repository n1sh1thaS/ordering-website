"use server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function removeItem(item_id: string){
    try {
        const client = await clientPromise;
        await client.db('store').collection('cart').deleteOne({_id: new ObjectId(item_id)})
        console.log('item deleted')
    }
    catch (err) {
        console.error(err)
    }
}