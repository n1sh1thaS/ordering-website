"use server";
import clientPromise from "@/lib/db";
import { WithId } from "mongodb";
import { Document } from "bson"
import { CartItem } from "@/lib/constants";

export async function getCart(){
    try {
        const client = await clientPromise;

        let data: WithId<Document>[] = await client.db('store').collection('cart').find({}).toArray()
        
        const cart: CartItem[] = data.map((item) => {
            return {
                _id: item._id.toString(), 
                product_id: item.product_id.toString(),
                title: String(item.title), 
                image: String(item.image), 
                sku: String(item.sku), 
                price: Number(item.price)
            }
        })
        return cart || [];
    }
    catch (err) {
        console.error(err)
    }
}