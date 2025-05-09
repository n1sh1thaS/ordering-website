import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, {params}: { params: { itemId: string } }){
    try {
        const itemId = params.itemId;
        const client = await clientPromise;
        await client.db('store').collection('cart').deleteOne({_id: new ObjectId(itemId)})
        return NextResponse.json({status: 200})
    }
    catch (err) {
        console.error(err)
    }
}