import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, context: any){
    try {
        const itemId = context.params.itemId;

        const client = await clientPromise;
        await client.db('store').collection('cart').deleteOne({_id: new ObjectId(itemId)})
        return NextResponse.json({status: 200})
    }
    catch (err) {
        console.error(err)
        return NextResponse.json({error: 'Error removing item', status: 500})
    }
}