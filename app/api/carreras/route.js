import { NextResponse } from "next/server";
import { collection, getDocs} from "firebase/firestore";
import {db } from "@/firebase/config"

export async function GET() {
    // const {id} = params
    const data = collection(db, "carreras")
    
    // const q = id === data.id ? data : query(data,where('type', '==',id))
    
    const querySnapshot = await getDocs(data)

    const docs = querySnapshot.docs.map(doc => doc.data())
    return NextResponse.json(docs)
}