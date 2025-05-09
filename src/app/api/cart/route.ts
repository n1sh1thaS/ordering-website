"use server";
import clientPromise from "@/lib/db";
import { WithId } from "mongodb";
import { Document } from "bson"
import { CartItem } from "@/lib/constants";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const item : {product_id: string, title: string, sku: string, image: string, price: number} = await req.json()
        if (!item.product_id ){
            return NextResponse.json({error: 'Invalid product'}, {status: 400 })
        }
        const client = await clientPromise;
        await client.db('store').collection('cart').insertOne(item)
        return NextResponse.json({status: 201})
    }
    catch (err) {
        console.error(err)
    }
}

export async function GET(){
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
        return cart ? NextResponse.json(cart)  : NextResponse.json([])
    }
    catch (err) {
        console.error(err)
    }
}
